<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const currentYear = new Date().getFullYear()

const links = [
  { label: t('FOOTER.ABOUT'), to: localePath('/about') },
  { label: t('FOOTER.PRIVACY'), to: localePath('/privacy') },
  { label: t('FOOTER.TERMS'), to: localePath('/terms') },
  { label: t('FOOTER.CONTACT'), to: localePath('/contact') }
]
</script>

<template>
  <footer class="app-footer">
    <div class="container">
      <div class="app-footer__inner">
        <div class="app-footer__brand">
          <div class="app-footer__logo">S</div>
          <p class="app-footer__tagline">
            {{ t('FOOTER.TAGLINE') }}
          </p>
        </div>

        <nav class="app-footer__nav">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="app-footer__link"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <div class="app-footer__copy">
          &copy; {{ currentYear }} {{ t('GLOBAL.APP_NAME') }}. {{ t('FOOTER.RIGHTS') }}
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss" src="./AppFooter.scss"></style>
