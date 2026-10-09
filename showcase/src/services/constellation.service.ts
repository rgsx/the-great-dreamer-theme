import type { Star, Constellation } from './types';

/** Light-years per parsec, used for distance conversions. */
export const LY_PER_PARSEC = 3.26156 as const;

export enum Visibility {
  NakedEye = 'naked-eye-tonight',
  Binoculars = 'binoculars',
  Telescope = 'telescope',
}

/**
 * @deprecated Use `ConstellationService.brightest()` instead.
 */
export function legacyBrightest(stars: Star[]): Star | undefined {
  return [...stars].sort((a, b) => a.magnitude - b.magnitude)[0];
}

export class ConstellationService {
  private readonly cache = new Map<string, Constellation>();

  constructor(private readonly endpoint: string = '/api/sky') {}

  async load(name: string): Promise<Constellation> {
    const cached = this.cache.get(name);
    if (cached) return cached;

    const res = await fetch(`${this.endpoint}/constellations/${encodeURIComponent(name)}`);
    if (!res.ok) {
      throw new Error(`Could not reach the stars: ${res.status}`);
    }

    const data = (await res.json()) as Constellation;
    this.cache.set(name, data);
    return data;
  }

  brightest(stars: Star[]): Star | undefined {
    return stars.reduce<Star | undefined>(
      (best, star) => (!best || star.magnitude < best.magnitude ? star : best),
      undefined,
    );
  }

  visibility(star: Star): Visibility {
    if (star.magnitude <= 6) return Visibility.NakedEye;
    if (star.magnitude <= 9.5) return Visibility.Binoculars;
    return Visibility.Telescope;
  }

  distanceInLightYears(star: Star): number {
    return Math.round(star.parsecs * LY_PER_PARSEC * 100) / 100;
  }
}
