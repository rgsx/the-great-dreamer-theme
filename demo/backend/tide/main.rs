//! The Great Dreamer: Rust (source.rust).
//! A tide watcher for the harbour at Innsmouth, split over three files:
//! `main.rs` (entry point), `tides.rs` (types, traits, generics) and `omens.rs` (macros, async).

mod omens;
mod tides;

use std::collections::HashMap;
use std::fmt::Write as _;
use std::future::Future;
use std::pin::pin;
use std::task::{Context, Poll, Waker};

use omens::{chant, watch_the_reef, Omen};
use tides::{Reading, Tide, TideTable};

/// Depth, in fathoms, below which the old reef is said to wake.
pub const REEF_DEPTH: f64 = 47.5;
static HARBOUR: &str = "Innsmouth";
const SIGIL: &str = r#"ph'nglui mglw'nafh "Cthulhu" R'lyeh wgah'nagl fhtagn"#;

#[derive(Debug, Default)]
struct Census<'a> {
    harbour: &'a str,
    sightings: HashMap<Omen, u32>,
}

impl<'a> Census<'a> {
    fn new(harbour: &'a str) -> Self {
        Self { harbour, ..Default::default() }
    }

    fn record(&mut self, omen: Omen) -> &mut Self {
        *self.sightings.entry(omen).or_insert(0) += 1;
        self
    }
}

fn main() -> Result<(), tides::TideError> {
    let table: TideTable<Reading> = "03:12 high 4.2\n09:40 low 0.8\n15:31 high 4.9\n21:58 low 0.3"
        .parse()?;

    let mut census = Census::new(HARBOUR);
    for reading in table.iter().filter(|r| matches!(r.tide, Tide::High { .. })) {
        census.record(Omen::from(reading));
    }

    let deepest = table
        .iter()
        .map(|r| r.depth)
        .fold(f64::MIN, f64::max);

    // Poll the watcher once with a no-op waker; the reef answers immediately.
    let mut watcher = pin!(watch_the_reef(&table, REEF_DEPTH));
    let mut cx = Context::from_waker(Waker::noop());
    let verdict = match watcher.as_mut().poll(&mut cx) {
        Poll::Ready(Ok(omen)) => format!("the reef sends {omen:?}"),
        Poll::Ready(Err(err)) => format!("the reef is silent: {err}"),
        Poll::Pending => String::from("still waiting at low water"),
    };

    let mut report = String::new();
    writeln!(report, "{:<12}|{:>8.2} fathoms", census.harbour, deepest).unwrap();
    writeln!(report, "{verdict}; {} kinds of omen, 0x{:04X}", census.sightings.len(), 0x2f_u16).unwrap();
    print!("{report}{}", chant!(SIGIL, times = 2));
    Ok(())
}
