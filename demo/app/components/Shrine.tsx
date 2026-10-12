// The Great Dreamer: React with TypeScript (source.tsx)
import { useMemo, useState, type ReactNode } from 'react';

type Tide = 'high' | 'low';

interface ShrineProps {
  name: string;
  depth?: number;
  children?: ReactNode;
}

const Candle = ({ lit }: { lit: boolean }) => <span className={lit ? 'candle lit' : 'candle'} />;

function Shrine({ name, depth = 47, children }: ShrineProps) {
  return (
    <section aria-label={name} data-depth={depth}>
      <h2>{name}</h2>
      {children}
    </section>
  );
}

export function Innsmouth({ tides }: { tides: Tide[] }) {
  const [lit, setLit] = useState<boolean>(false);
  const high = useMemo(() => tides.filter((tide) => tide === 'high').length, [tides]);

  return (
    <Shrine name="Devil Reef">
      <Candle lit={lit} />
      <p>
        {high} high tides of {tides.length}
      </p>
      <button type="button" onClick={() => setLit((value) => !value)}>
        {lit ? 'Snuff the candle' : 'Light the candle'}
      </button>
    </Shrine>
  );
}
