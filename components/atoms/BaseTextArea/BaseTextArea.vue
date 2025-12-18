<script setup lang="ts">
import { computed, ref } from 'vue'
import { ZodObject, type ZodTypeAny } from 'zod'

const props = defineProps<{
  modelValue: string
  name: string
  label?: string
  placeholder?: string
  rows?: number
  schema?: ZodObject<Record<string, ZodTypeAny>> | ZodTypeAny
}>()

const emit = defineEmits<{
  'update:modelValue': [string]
  blur: []
}>()

const touched = ref(false)

const fieldSchema = computed<ZodTypeAny | null>(() => {
  if (!props.schema) return null
  if (props.schema instanceof ZodObject) {
    const shape = props.schema.shape as Record<string, ZodTypeAny>
    return shape[props.name] || null
  }
  return props.schema
})

const rawError = computed(() => {
  if (!fieldSchema.value) return ''
  const result = fieldSchema.value.safeParse(props.modelValue)
  return result.success ? '' : result.error.issues[0]?.message ?? ''
})

const error = computed(() => (touched.value ? rawError.value : ''))

const onInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  touched.value = true
  emit('update:modelValue', target.value)
}

const onBlur = () => {
  touched.value = true
  emit('blur')
}
</script>

<template>
  <label class="base-textarea">
    <div class="base-textarea__header">
      <span class="base-textarea__label">{{ label }}</span>
      <span v-if="error" class="base-textarea__error">{{ error }}</span>
    </div>
    <textarea
      :value="modelValue"
      :name="name"
      :rows="rows || 4"
      :placeholder="placeholder"
      class="base-textarea__control"
      @input="onInput"
      @blur="onBlur"
    />
  </label>
</template>

<style scoped src="./BaseTextArea.css"></style>
