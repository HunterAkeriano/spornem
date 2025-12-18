<script setup lang="ts">
import { computed, ref } from 'vue'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import { ZodObject, type ZodTypeAny } from 'zod'

const props = defineProps<{
  modelValue: Date | null
  name: string
  label?: string
  placeholder?: string
  schema?: ZodObject<Record<string, ZodTypeAny>> | ZodTypeAny
}>()

const emit = defineEmits<{
  'update:modelValue': [Date | null]
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

const onUpdate = (value: Date | null) => {
  touched.value = true
  emit('update:modelValue', value)
}
const onBlur = () => {
  touched.value = true
  emit('blur')
}
</script>

<template>
  <label class="base-date">
    <div class="base-date__header">
      <span class="base-date__label">{{ label }}</span>
      <span v-if="error" class="base-date__error">{{ error }}</span>
    </div>
    <div class="base-date__field">
      <VueDatePicker
        :model-value="modelValue"
        :placeholder="placeholder"
        :name="name"
        input-class-name="base-date__control"
        :enable-time-picker="true"
        :clearable="false"
        :teleport="true"
        auto-apply
        @update:model-value="onUpdate"
        @blur="onBlur"
      />
    </div>
  </label>
</template>

<style scoped src="./BaseDatePicker.css"></style>
