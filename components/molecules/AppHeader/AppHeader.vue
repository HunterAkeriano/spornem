<script setup lang="ts">
import { computed } from 'vue'

const { locale, t } = useI18n()
const router = useRouter()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()

const locales = [
  { code: 'en', name: 'English' },
  { code: 'uk', name: 'Українська' }
]

const currentLocaleName = computed(() => {
  return locales.find(l => l.code === locale.value)?.name || 'EN'
})

const switchLocale = async (code: string) => {
  const path = switchLocalePath(code)
  if (path) {
    await router.push(path)
  }
}

const navigation = computed(() => [
  { to: localePath('/'), label: t('NAV.HOME') },
  { to: localePath('/create-debate'), label: t('NAV.CREATE_DEBATE') }
])
</script>

<template>
  <header class="app-header">
    <div class="container">
      <div class="app-header__inner">
        <NuxtLink :to="localePath('/')" class="app-header__brand">
          <div class="app-header__logo">S</div>
          <span class="app-header__name">{{ t('GLOBAL.APP_NAME') }}</span>
        </NuxtLink>

        <nav class="app-header__nav">
          <NuxtLink
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            class="app-header__nav-link"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="app-header__actions">
          <div class="app-header__lang">
            <button class="app-header__lang-btn" type="button">
              {{ currentLocaleName }}
            </button>
            <div class="app-header__lang-dropdown">
              <button
                v-for="loc in locales"
                :key="loc.code"
                type="button"
                class="app-header__lang-option"
                @click="switchLocale(loc.code)"
              >
                {{ loc.name }}
              </button>
            </div>
          </div>

          <button class="btn btn_primary" type="button">
            {{ t('GLOBAL.LOGIN') }}
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss" src="./AppHeader.scss"></style>
