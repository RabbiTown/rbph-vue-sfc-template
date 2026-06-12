<script setup lang="ts">
import { computed, inject } from 'vue';
import type { RbphContext } from './rbph';

const props = defineProps<{
  rbph: RbphContext;
}>();

const rbph = inject<RbphContext>('rbph', props.rbph);
const puzzle = computed(() => rbph.state.getPuzzle());
const team = computed(() => rbph.state.getTeam());

function showToast() {
  rbph.actions.toast({
    title: 'Vue app mounted',
    description: 'This toast is sent through RBPH injected actions.',
    color: 'primary',
  });
}
</script>

<template>
  <section class="rbph-sfc-demo">
    <header>
      <p class="eyebrow">RBPH Vue SFC</p>
      <h2>Custom interactive content</h2>
    </header>

    <dl>
      <div>
        <dt>Puzzle</dt>
        <dd>{{ puzzle?.data?.title ?? 'Unavailable' }}</dd>
      </div>
      <div>
        <dt>Team</dt>
        <dd>{{ team?.name ?? 'Unavailable' }}</dd>
      </div>
    </dl>

    <button type="button" @click="showToast">Test injected action</button>
  </section>
</template>
