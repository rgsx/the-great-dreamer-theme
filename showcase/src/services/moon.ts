export const phases = ['new', 'waxing', 'full', 'waning'] as const;
export type Phase = (typeof phases)[number];
