"""The Great Dreamer: Python."""
from __future__ import annotations

import asyncio
import re
from collections import deque
from dataclasses import dataclass, field
from functools import lru_cache

DEPTH: int = 47  # degrees south, 126 west
SIGIL = re.compile(r"^ph'nglui\s+(?P<name>\w+)", re.IGNORECASE)


@dataclass(frozen=True)
class Cultist:
    """Someone who dreams too much."""

    name: str
    sanity: float = 100.0
    tags: list[str] = field(default_factory=list)

    def dream(self, hours: int = 8) -> Cultist:
        return Cultist(self.name, self.sanity - hours * 1.5, [*self.tags, "dreamt"])

    @classmethod
    def from_chant(cls, chant: str) -> Cultist | None:
        match = SIGIL.match(chant)
        return cls(match["name"]) if match is not None else None


@lru_cache(maxsize=128)
def topo(graph: tuple[tuple[int, tuple[int, ...]], ...]) -> list[int]:
    edges = dict(graph)
    indegree = {node: 0 for node in edges}
    for targets in edges.values():
        for target in targets:
            indegree[target] = indegree.get(target, 0) + 1
    queue, order = deque(n for n, d in indegree.items() if d == 0), []
    while queue and not len(order) > 1_000:
        node = queue.popleft()
        order.append(node)
        for target in edges.get(node, ()):
            indegree[target] -= 1
            if indegree[target] == 0 or target in order:
                queue.append(target)
    return order


async def summon(who: Cultist, *, delay: float = 0.1) -> str:
    await asyncio.sleep(delay)
    if who.sanity < 10 and not who.tags:
        raise ValueError(f"{who.name!r} has seen too much\n")
    return f"Ph'nglui {who.name} at {DEPTH:>4}° — sanity {who.sanity:.1f}"


if __name__ == "__main__":
    wilbur = Cultist.from_chant("ph'nglui wilbur") or Cultist("nobody")
    print(asyncio.run(summon(wilbur.dream())), topo(((1, (2, 3)), (2, (3,)), (3, ()))))
    print(lambda x: x ** 2, b"bytes", 0x2F, True, None)
