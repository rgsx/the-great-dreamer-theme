<script setup lang="ts">
import { computed, ref } from 'vue';
import StarCard from './StarCard';
import type { Star } from '../services/types';

const props = defineProps<{ stars: Star[]; title?: string }>();
const emit = defineEmits<{ (e: 'select', star: Star): void }>();

const query = ref('');
const onlyVisible = ref(true);

const filtered = computed(() =>
  props.stars
    .filter((star) => !onlyVisible.value || star.magnitude < 6)
    .filter((star) => star.name.toLowerCase().includes(query.value.toLowerCase())),
);
</script>

<template>
  <section class="star-list" :aria-label="title ?? 'Stars'">
    <header>
      <h2>{{ title ?? 'Tonight’s sky' }}</h2>
      <input v-model.trim="query" type="search" placeholder="Search stars…" />
      <label><input v-model="onlyVisible" type="checkbox" /> Naked eye only</label>
    </header>

    <p v-if="filtered.length === 0" class="empty">No stars match “{{ query }}”.</p>
    <ul v-else>
      <li v-for="star in filtered" :key="star.id" @click.prevent="emit('select', star)">
        <StarCard :star="star" compact />
      </li>
    </ul>

    <slot name="footer" :count="filtered.length">
      <small>{{ filtered.length }} of {{ stars.length }} visible</small>
    </slot>
  </section>
</template>

<style scoped lang="scss">
.star-list {
  display: grid;
  gap: 1rem;

  .empty {
    color: var(--muted);
    font-style: italic;
  }
}
</style>
