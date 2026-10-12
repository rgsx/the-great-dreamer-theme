<template>
  <form class="ritual" @submit.prevent="begin">
    <h2 v-bind:title="tooltip">{{ name }} — {{ chants.length }} chants</h2>

    <input v-model.trim="name" v-focus :[dynamicAttr]="placeholder" />

    <p v-if="uiState === 'listening'" class="hint">Listening to the deep…</p>
    <p v-else-if="aborted" class="hint">The ritual was aborted.</p>
    <ul v-else>
      <li v-for="(chant, index) in chants" :key="chant" v-on:click="remove(index)">
        {{ index + 1 }}. {{ chant }}
      </li>
    </ul>

    <slot name="footer" :count="chants.length">
      <button type="submit" :class="{ disabled: uiState === 'listening' }">Begin</button>
    </slot>
    <OmenClock :stars="chants.length">
      <template #after="{ when }">
        <small>Begins at {{ when }}</small>
      </template>
    </OmenClock>
  </form>
</template>

<script>
import OmenClock from './OmenClock.vue';

export default {
  name: 'RitualForm',
  components: { OmenClock },
  directives: {
    focus: { mounted: (el) => el.focus() },
  },
  props: {
    aborted: { type: Boolean, default: false },
  },
  emits: ['begin'],
  data() {
    return { name: 'Cthulhu', chants: ["Ph'nglui", 'fhtagn'], dynamicAttr: 'placeholder', glow: '#9aefea' };
  },
  computed: {
    uiState() {
      return this.$store.state.uiState;
    },
    placeholder() {
      return `Summon ${this.name}`;
    },
    tooltip() {
      return this.aborted ? 'Aborted' : 'Ready';
    },
  },
  methods: {
    begin() {
      this.$emit('begin', this.name);
    },
    remove(index) {
      this.chants.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.ritual {
  --glow: v-bind(glow);
  border-radius: 1000px;
  transition: 0.3s all ease-out;
}

button.disabled:hover {
  background: #ccc;
  cursor: not-allowed;
}
</style>
