<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { z } from 'zod'
import { BaseInput, BaseSelect, BaseTextArea, BaseDatePicker } from '@/components/atoms'

const { t } = useI18n()
const { $globalContext } = useNuxtApp()

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
  $globalContext.setPath($globalContext.currentPath.value)
}
</script>

<template>
  <div class="page">
    <section class="hero">
      <div class="section-heading">
        <h1 class="section-title">{{ t('DEBATE.TITLE') }}</h1>
        <p class="section-subtitle">{{ t('DEBATE.SUBTITLE') }}</p>
      </div>
      <div class="card-grid">
        <div class="card">
          <strong>{{ t('DEBATE.CATEGORIES') }}</strong>
          <span>{{ t('DEBATE.CATEGORY_TECH') }} · {{ t('DEBATE.CATEGORY_SOCIAL') }}</span>
        </div>
        <div class="card">
          <strong>{{ t('DEBATE.SCHEDULE') }}</strong>
          <span>{{ t('GLOBAL.APP_NAME') }}</span>
        </div>
        <div class="card">
          <strong>{{ t('GLOBAL.APP_NAME') }}</strong>
          <span>{{ $globalContext.currentPath }}</span>
        </div>
      </div>
    </section>

    <section class="form-shell glass-panel">
      <form class="form" @submit.prevent="submitForm">
        <div class="form-row">
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

        <div class="form-row">
          <BaseDatePicker
            v-model="formState.schedule"
            :schema="schema"
            name="schedule"
            :label="t('DEBATE.SCHEDULE')"
            :placeholder="t('DEBATE.SCHEDULE')"
          />
        </div>

        <div class="form-row">
          <BaseTextArea
            v-model="formState.description"
            :schema="schema"
            name="description"
            :label="t('DEBATE.DESCRIPTION')"
            :placeholder="t('DEBATE.PLACEHOLDER_DESCRIPTION')"
          />
        </div>

        <div class="form-row">
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

        <div class="form-actions">
          <button type="submit" class="primary-btn">{{ t('GLOBAL.ACTION_PRIMARY') }}</button>
        </div>

        <div v-if="feedback" class="feedback">
          {{ feedback }}
        </div>
      </form>
    </section>
  </div>
</template>
