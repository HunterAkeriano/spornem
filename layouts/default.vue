<script setup lang="ts">
import { AppHeader } from '@/components/molecules/AppHeader'
import { AppFooter } from '@/components/molecules/AppFooter'
</script>

<template>
  <div class="layout">
    <AppHeader />
    <main class="layout__main">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-top: 90px;

  &__main {
    flex: 1;
  }
}
</style>
