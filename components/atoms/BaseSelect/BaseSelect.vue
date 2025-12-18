<script setup lang="ts">
import { computed, ref } from 'vue'
import { ZodObject, type ZodTypeAny } from 'zod'

type Option = {
  label: string
  value: string
}

const props = defineProps<{
  modelValue: string
  name: string
  label?: string
  placeholder?: string
  options: Option[]
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

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  touched.value = true
  emit('update:modelValue', target.value)
}

const onBlur = () => {
  touched.value = true
  emit('blur')
}
</script>

<template>
  <label class="base-select">
    <div class="base-select__header">
      <span class="base-select__label">{{ label }}</span>
      <span v-if="error" class="base-select__error">{{ error }}</span>
    </div>
    <div class="base-select__field">
      <select
        :value="modelValue"
        :name="name"
        class="base-select__control"
        @change="onChange"
        @blur="onBlur"
      >
        <option value="" disabled>
          {{ placeholder }}
        </option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  </label>
</template>

<style scoped src="./BaseSelect.css"></style>
