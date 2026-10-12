//! Tides, readings and the table that holds them.

use std::fmt;
use std::ops::Index;
use std::str::FromStr;

#[derive(Debug, Clone, Copy, PartialEq)]
pub enum Tide {
    High { surge: bool },
    Low,
    Slack(u8),
}

#[derive(Debug, Clone, PartialEq)]
pub struct Reading {
    pub time: (u8, u8),
    pub tide: Tide,
    pub depth: f64,
}

#[derive(Debug)]
pub enum TideError {
    Malformed { line: usize, reason: &'static str },
    BadNumber(std::num::ParseFloatError),
}

impl fmt::Display for TideError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::Malformed { line, reason } => write!(f, "line {line}: {reason}"),
            Self::BadNumber(e) => write!(f, "bad depth ({e})"),
        }
    }
}

impl std::error::Error for TideError {}

impl From<std::num::ParseFloatError> for TideError {
    fn from(e: std::num::ParseFloatError) -> Self {
        TideError::BadNumber(e)
    }
}

/// Anything that can be measured against the reef.
pub trait Sounding {
    fn depth(&self) -> f64;

    fn is_ominous(&self, threshold: f64) -> bool {
        self.depth() > threshold
    }
}

impl Sounding for Reading {
    fn depth(&self) -> f64 {
        self.depth
    }
}

#[derive(Debug, Default)]
pub struct TideTable<T: Sounding> {
    entries: Vec<T>,
}

impl<T: Sounding> TideTable<T> {
    pub fn iter(&self) -> impl Iterator<Item = &T> + '_ {
        self.entries.iter()
    }

    pub fn deepest<'t>(&'t self, threshold: f64) -> Option<&'t T>
    where
        T: fmt::Debug,
    {
        self.entries
            .iter()
            .filter(|e| e.is_ominous(threshold))
            .max_by(|a, b| a.depth().total_cmp(&b.depth()))
    }
}

impl<T: Sounding> Index<usize> for TideTable<T> {
    type Output = T;

    fn index(&self, i: usize) -> &T {
        &self.entries[i]
    }
}

impl FromStr for TideTable<Reading> {
    type Err = TideError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let entries = s
            .lines()
            .enumerate()
            .map(|(n, line)| {
                let mut parts = line.split_whitespace();
                let (Some(time), Some(kind), Some(depth)) = (parts.next(), parts.next(), parts.next()) else {
                    return Err(TideError::Malformed { line: n + 1, reason: "expected 3 fields" });
                };
                let (h, m) = time.split_once(':').ok_or(TideError::Malformed { line: n + 1, reason: "no ':'" })?;
                let tide = match kind {
                    "high" => Tide::High { surge: false },
                    "low" => Tide::Low,
                    other if other.starts_with("slack") => Tide::Slack(other.len() as u8),
                    _ => return Err(TideError::Malformed { line: n + 1, reason: "unknown tide" }),
                };
                Ok(Reading { time: (h.parse().unwrap_or(0), m.parse().unwrap_or(0)), tide, depth: depth.parse()? })
            })
            .collect::<Result<Vec<_>, _>>()?;
        Ok(TideTable { entries })
    }
}
