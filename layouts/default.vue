<script setup lang="ts">
import { computed } from 'vue'

const { locale, t } = useI18n()
const router = useRouter()
const switchLocalePath = useSwitchLocalePath()
const nuxtApp = useNuxtApp()

const toggleLocale = async () => {
  const target = locale.value === 'uk' ? 'en' : 'uk'
  const path = switchLocalePath(target)
  if (path) {
    await router.push(path)
    nuxtApp.$globalContext?.setPath?.(path)
  }
}

const localeLabel = computed(() => locale.value.toUpperCase())
</script>

<template>
  <div class="app-shell">
    <header class="header glass-panel">
      <div class="brand">
        <div class="brand-mark">C</div>
        <div>
          <div>{{ t('GLOBAL.APP_NAME') }}</div>
          <small>{{ nuxtApp.$globalContext.currentPath }}</small>
        </div>
      </div>
      <button type="button" class="lang-switch" @click="toggleLocale">
        {{ t('GLOBAL.LANG_SWITCH') }} · {{ localeLabel }}
      </button>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>
