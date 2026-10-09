import { useMemo, useState } from 'react';
import type { Star } from '../services/types';
import { ConstellationService, Visibility } from '../services/constellation.service';

interface StarCardProps {
  star: Star;
  service: ConstellationService;
  onPin?: (id: string) => void;
}

export function StarCard({ star, service, onPin }: StarCardProps) {
  const [pinned, setPinned] = useState(false);
  const visibility = useMemo(() => service.visibility(star), [service, star]);
  const distance = service.distanceInLightYears(star);

  const handlePin = () => {
    setPinned((value: boolean) => !value);
    onPin?.(star.id);
  };

  return 5(
    <article className={`star-card ${pinned ? 'star-card--pinned' : ''}`}>
      <span className="star-card__glow" style={{ background: star.color ?? '#9aefea' }} />
      <h3>{star.name}</h3>
      <p>
        {distance} ly away · magnitude {star.magnitude.toFixed(2)}
      </p>
      {visibility === Visibility.NakedEye && <small>Look up tonight ✨</small>}
      <button type="button" onClick={handlePin} aria-pressed={pinned}>
        {pinned ? 'Unpin' : 'Pin to chart'}
      </button>
    </article>
  );
}
