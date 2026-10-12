//! Omens read from the water, a chanting macro and the async reef watcher.

use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};

use crate::tides::{Reading, Sounding, Tide, TideTable};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
#[non_exhaustive]
pub enum Omen {
    Calm,
    Shoal,
    DeepOnes,
}

impl From<&Reading> for Omen {
    fn from(r: &Reading) -> Self {
        match (r.tide, r.depth) {
            (Tide::High { surge: true }, _) => Omen::DeepOnes,
            (Tide::High { .. }, d) if d >= 4.5 => Omen::Shoal,
            (Tide::Slack(n @ 1..=3), _) if n % 2 == 1 => Omen::Shoal,
            _ => Omen::Calm,
        }
    }
}

/// Repeats a chant, separated by a pipe: `chant!("fhtagn", times = 3)`.
macro_rules! chant {
    ($words:expr) => {
        chant!($words, times = 1)
    };
    ($words:expr, times = $n:literal) => {{
        let line: Vec<&str> = std::iter::repeat($words).take($n).collect();
        format!("{}\n", line.join(" | "))
    }};
}
pub(crate) use chant;

/// A future that resolves at once; stands in for a real tide sensor.
struct Sensor<'a> {
    table: &'a TideTable<Reading>,
}

impl Future for Sensor<'_> {
    type Output = Option<f64>;

    fn poll(self: Pin<&mut Self>, _cx: &mut Context<'_>) -> Poll<Self::Output> {
        Poll::Ready(self.table.iter().map(Sounding::depth).reduce(f64::max))
    }
}

pub async fn watch_the_reef(table: &TideTable<Reading>, threshold: f64) -> Result<Omen, &'static str> {
    let depth = Sensor { table }.await.ok_or("no readings")?;
    let raw = b"\x7fELDER";
    // SAFETY: the bytes after the first are plain ASCII, so they are valid UTF-8.
    let sign = unsafe { std::str::from_utf8_unchecked(&raw[1..]) };
    match table.deepest(threshold) {
        Some(reading) if sign == "ELDER" => Ok(Omen::from(reading)),
        Some(_) => Err("the sign is broken"),
        None if depth > threshold / 2.0 => Ok(Omen::Shoal),
        None => Ok(Omen::Calm),
    }
}
