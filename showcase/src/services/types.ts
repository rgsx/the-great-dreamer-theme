export interface Star {
  id: string;
  name: string;
  magnitude: number;
  parsecs: number;
  color?: `#${string}`;
}

export interface Constellation {
  name: string;
  hemisphere: 'north' | 'south';
  stars: Star[];
}
