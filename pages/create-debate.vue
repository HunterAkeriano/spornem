<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { z } from 'zod'
import { BaseInput, BaseSelect, BaseTextArea, BaseDatePicker } from '@/components/atoms'

const { t } = useI18n()

const schema = computed(() =>
  z.object({
    topic: z.string().min(3, t('ERRORS.TOPIC_REQUIRED')),
    category: z.string().min(1, t('ERRORS.CATEGORY_REQUIRED')),
    description: z.string().min(12, t('ERRORS.DESCRIPTION_REQUIRED')),
    schedule: z
      .date({ message: t('ERRORS.DATE_REQUIRED') })
      .refine((value) => value && value > new Date(), t('ERRORS.DATE_REQUIRED')),
    name: z.string().min(2, t('ERRORS.NAME_REQUIRED')),
    email: z.string().email(t('ERRORS.EMAIL_REQUIRED'))
  })
)

const formState = reactive({
  topic: '',
  category: '',
  description: '',
  schedule: new Date(Date.now() + 60 * 60 * 1000),
  name: '',
  email: ''
})

const categories = computed(() => [
  { label: t('DEBATE.CATEGORY_POLITICS'), value: 'politics' },
  { label: t('DEBATE.CATEGORY_SOCIAL'), value: 'social' },
  { label: t('DEBATE.CATEGORY_TECH'), value: 'tech' },
  { label: t('DEBATE.CATEGORY_OTHER'), value: 'other' }
])

const feedback = ref('')

const submitForm = () => {
  const result = schema.value.safeParse(formState)
  feedback.value = result.success ? t('GLOBAL.FEEDBACK_SUCCESS') : t('GLOBAL.FEEDBACK_ERROR')
}
</script>

<template>
  <div class="create-debate">
    <div class="container">
      <section class="section">
        <h1 class="section__title">{{ t('DEBATE.TITLE') }}</h1>
        <p class="section__subtitle">{{ t('DEBATE.SUBTITLE') }}</p>
      </section>

      <div class="debate-form">
        <form class="debate-form__inner" @submit.prevent="submitForm">
          <div class="debate-form__row">
            <BaseInput
              v-model="formState.topic"
              :schema="schema"
              name="topic"
              :label="t('DEBATE.TOPIC')"
              :placeholder="t('DEBATE.PLACEHOLDER_TOPIC')"
            />
            <BaseSelect
              v-model="formState.category"
              :schema="schema"
              name="category"
              :label="t('DEBATE.CATEGORY')"
              :placeholder="t('DEBATE.PLACEHOLDER_CATEGORY')"
              :options="categories"
            />
          </div>

          <div class="debate-form__row">
            <BaseDatePicker
              v-model="formState.schedule"
              :schema="schema"
              name="schedule"
              :label="t('DEBATE.SCHEDULE')"
              :placeholder="t('DEBATE.SCHEDULE')"
            />
          </div>

          <div class="debate-form__row">
            <BaseTextArea
              v-model="formState.description"
              :schema="schema"
              name="description"
              :label="t('DEBATE.DESCRIPTION')"
              :placeholder="t('DEBATE.PLACEHOLDER_DESCRIPTION')"
            />
          </div>

          <div class="debate-form__row">
            <BaseInput
              v-model="formState.name"
              :schema="schema"
              name="name"
              :label="t('USER.NAME')"
              :placeholder="t('USER.NAME')"
            />
            <BaseInput
              v-model="formState.email"
              :schema="schema"
              name="email"
              type="email"
              :label="t('USER.EMAIL')"
              :placeholder="t('USER.EMAIL')"
            />
          </div>

          <div class="debate-form__actions">
            <button type="submit" class="btn btn_primary">
              {{ t('GLOBAL.ACTION_PRIMARY') }}
            </button>
          </div>

          <div v-if="feedback" class="debate-form__feedback">
            {{ feedback }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.create-debate {
  padding: $spacing-2xl 0 $spacing-3xl * 2;
}

.debate-form {
  @include glass-panel;
  padding: $spacing-3xl;

  @include mobile {
    padding: $spacing-xl;
  }

  &__inner {
    max-width: 800px;
    margin: 0 auto;
  }

  &__row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: $spacing-lg;
    margin-bottom: $spacing-lg;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    margin-top: $spacing-xl;

    @include mobile {
      justify-content: stretch;
    }
  }

  &__feedback {
    margin-top: $spacing-lg;
    padding: $spacing-md $spacing-lg;
    border-radius: $radius-md;
    background: rgba($marine-mid, 0.1);
    color: $marine-deep;
    font-weight: 600;
    text-align: center;
  }
}
</style>
