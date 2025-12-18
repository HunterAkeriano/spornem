<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { LangSelect } from '@/components/molecules'

const { locale, t } = useI18n()
const router = useRouter()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()

const isMenuOpen = ref(false)

const locales = [
  { code: 'en', name: 'English' },
  { code: 'uk', name: 'Українська' }
]

const switchLocale = async (code: string) => {
  const path = switchLocalePath(code)
  if (path) {
    await router.push(path)
    isMenuOpen.value = false
  }
}

const navigation = computed(() => [
  { to: localePath('/'), label: t('NAV.HOME') },
  { to: localePath('/create-debate'), label: t('NAV.CREATE_DEBATE') }
])

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

watch(isMenuOpen, (newValue) => {
  if (typeof document !== 'undefined') {
    if (newValue) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})
</script>

<template>
  <header class="app-header">
    <div class="container">
      <div class="app-header__inner">
        <NuxtLink :to="localePath('/')" class="app-header__brand" @click="closeMenu">
          <div class="app-header__logo">S</div>
          <span class="app-header__name">{{ t('GLOBAL.APP_NAME') }}</span>
        </NuxtLink>

        <nav class="app-header__nav app-header__nav_desktop">
          <NuxtLink
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            class="app-header__nav-link"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="app-header__actions app-header__actions_desktop">
          <LangSelect
            :locales="locales"
            :current-locale="locale"
            variant="desktop"
            @change="switchLocale"
          />

          <button class="btn btn_primary" type="button">
            {{ t('GLOBAL.LOGIN') }}
          </button>
        </div>

        <button
          class="app-header__burger"
          type="button"
          :class="{ 'app-header__burger_active': isMenuOpen }"
          @click="toggleMenu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <div
      class="app-header__overlay"
      :class="{ 'app-header__overlay_active': isMenuOpen }"
      @click="closeMenu"
    ></div>

    <div
      class="app-header__mobile-menu"
      :class="{ 'app-header__mobile-menu_active': isMenuOpen }"
    >
      <nav class="app-header__mobile-nav">
        <NuxtLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="app-header__mobile-link"
          @click="closeMenu"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="app-header__mobile-actions">
        <LangSelect
          :locales="locales"
          :current-locale="locale"
          variant="mobile"
          @change="switchLocale"
        />

        <button class="btn btn_primary" type="button" @click="closeMenu">
          {{ t('GLOBAL.LOGIN') }}
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss" src="./AppHeader.scss"></style>
