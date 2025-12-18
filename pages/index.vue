<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const features = [
  {
    title: t('HOME.FEATURE_1_TITLE'),
    description: t('HOME.FEATURE_1_DESC')
  },
  {
    title: t('HOME.FEATURE_2_TITLE'),
    description: t('HOME.FEATURE_2_DESC')
  },
  {
    title: t('HOME.FEATURE_3_TITLE'),
    description: t('HOME.FEATURE_3_DESC')
  }
]
</script>

<template>
  <div class="home">
    <section class="hero">
      <div class="container">
        <div class="hero__content">
          <h1 class="hero__title">
            {{ t('HOME.HERO_TITLE') }}
          </h1>
          <p class="hero__subtitle">
            {{ t('HOME.HERO_SUBTITLE') }}
          </p>
          <div class="hero__actions">
            <NuxtLink :to="localePath('/create-debate')" class="btn btn_primary">
              {{ t('HOME.CTA_PRIMARY') }}
            </NuxtLink>
            <button class="btn btn_secondary" type="button">
              {{ t('HOME.CTA_SECONDARY') }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <div class="features__grid">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="feature-card"
          >
            <h3 class="feature-card__title">
              {{ feature.title }}
            </h3>
            <p class="feature-card__desc">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.home {
  min-height: 100%;
}

.hero {
  padding: $spacing-3xl * 2 0;
  text-align: center;

  @include mobile {
    padding: $spacing-3xl 0;
  }

  &__content {
    max-width: 800px;
    margin: 0 auto;
  }

  &__title {
    margin: 0 0 $spacing-xl;
    font-size: clamp(32px, 6vw, 64px);
    font-weight: 900;
    letter-spacing: -1px;
    color: $marine-deep;
    line-height: 1.1;
  }

  &__subtitle {
    margin: 0 0 $spacing-3xl;
    font-size: clamp(16px, 3vw, 20px);
    color: $text-muted;
    line-height: 1.7;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  &__actions {
    display: flex;
    gap: $spacing-lg;
    justify-content: center;
    flex-wrap: wrap;
  }
}

.features {
  padding: $spacing-3xl * 2 0;

  @include mobile {
    padding: $spacing-3xl 0;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: $spacing-2xl;
  }
}

.feature-card {
  @include glass-panel;
  padding: $spacing-2xl;
  text-align: center;
  @include transition(transform, box-shadow);

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-strong;
  }

  &__title {
    margin: 0 0 $spacing-md;
    font-size: 20px;
    font-weight: 700;
    color: $marine-deep;
  }

  &__desc {
    margin: 0;
    color: $text-secondary;
    line-height: 1.6;
  }
}
</style>
