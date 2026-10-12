<!-- The Great Dreamer: Svelte (source.svelte) -->
<script>
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { writable } from 'svelte/store';

  export let name = 'Devil Reef';
  export let depth = 47;

  const DEPTH = 47;
  let lit = false;
  let chant = '';
  const tides = writable(['high', 'low', 'high']);

  $: high = $tides.filter((tide) => tide === 'high').length;
  $: label = lit ? 'Snuff the candle' : 'Light the candle';

  onMount(() => {
    const timer = setTimeout(() => tides.update((list) => [...list, 'low']), DEPTH);
    return () => clearTimeout(timer);
  });

  function toggle() {
    lit = !lit;
  }

  function record() {
    const next = chant.trim();
    if (!next) return;
    tides.update((list) => [...list, next]);
    chant = '';
  }
</script>

<svelte:window on:keydown={(event) => event.key === 'Escape' && (lit = false)} />

<section class:lit aria-label={name} data-depth={depth} in:fly={{ y: 12, duration: 240 }}>
  <h2>{name}</h2>
  <p>{high} high tides of {$tides.length}</p>

  {#if $tides.length === 0}
    <p class="hint">The water is still.</p>
  {:else}
    <ul>
      {#each $tides as tide, index (tide + index)}
        <li class:high={tide === 'high'}>{index + 1}. {tide}</li>
      {/each}
    </ul>
  {/if}

  <form on:submit|preventDefault={record}>
    <input bind:value={chant} placeholder="Name the tide" />
    <button type="button" on:click={toggle}>{label}</button>
    <button type="submit" disabled={!chant}>Record</button>
  </form>

  <slot name="footer" {high}>
    <small>Depth {depth}°</small>
  </slot>
</section>

<style>
  section {
    --glow: #9aefea;
    border-radius: 1000px;
  }

  section.lit {
    box-shadow: 0 0 24px var(--glow);
  }

  li.high::before {
    content: '✶';
  }
</style>
