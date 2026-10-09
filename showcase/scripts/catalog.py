"""Build a small star catalog from a CSV export."""
from dataclasses import dataclass
from pathlib import Path
import csv

LY_PER_PARSEC = 3.26156


@dataclass(frozen=True)
class Star:
    name: str
    magnitude: float
    parsecs: float

    @property
    def light_years(self) -> float:
        return round(self.parsecs * LY_PER_PARSEC, 2)


def load(path: Path) -> list[Star]:
    with path.open(newline="") as handle:
        return [Star(row["name"], float(row["mag"]), float(row["pc"])) for row in csv.DictReader(handle)]


if __name__ == "__main__":
    for star in sorted(load(Path("data/stars.csv")), key=lambda s: s.magnitude)[:5]:
        print(f"{star.name:<12} {star.light_years:>8} ly")
