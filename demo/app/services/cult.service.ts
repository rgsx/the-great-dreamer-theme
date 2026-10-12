// The Great Dreamer: TypeScript, including the semantic tokens the theme styles
// (enum members, readonly/const variables, namespaces, @deprecated).
import { Component, OnDestroy, OnInit } from '@angular/core';
import type { Subscription } from 'rxjs';

export namespace Rlyeh {
  export const DEPTH = 47 as const;
}

export enum Visibility {
  NakedEye = 'naked-eye',
  Telescope = 'telescope',
}

export interface Cultist<T extends string = string> {
  readonly id: number;
  name: T;
  sanity?: number;
}

/** @deprecated Use `SummoningService.summon()` instead. */
export function oldSummon(who: Cultist): string {
  return `Ph'nglui ${who.name} R'lyeh wgah'nagl fhtagn`;
}

export abstract class SummoningService {
  abstract summon(who: Cultist): Promise<boolean>;
}

@Component({
  selector: 'app-sky',
  templateUrl: './sky.component.html',
  styleUrls: ['./sky.component.css'],
})
export class SkyComponent implements OnInit, OnDestroy {
  private sub?: Subscription;
  cultists: Array<Cultist<'Wilbur' | 'Lavinia'>> = [];
  visibility: Visibility = Visibility.NakedEye;

  constructor(
    private readonly service: SummoningService,
    public depth: number = Rlyeh.DEPTH,
  ) {}

  async ngOnInit(): Promise<void> {
    const ready = await this.service.summon({ id: 1, name: 'Wilbur' });
    const pattern = /fhtagn\s*(\d+)?/i;
    if (ready && typeof this.depth === 'number' && pattern.test(oldSummon(this.cultists[0]))) {
      this.visibility = Visibility.Telescope;
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
