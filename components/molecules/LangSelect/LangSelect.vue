<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Locale {
  code: string
  name: string
}

const props = defineProps<{
  locales: Locale[]
  currentLocale: string
  variant?: 'desktop' | 'mobile'
}>()

const emit = defineEmits<{
  change: [code: string]
}>()

const isOpen = ref(false)
const selectRef = ref<HTMLDivElement | null>(null)

const currentLocaleName = computed(() => {
  return props.locales.find(l => l.code === props.currentLocale)?.name || 'EN'
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectLocale = (code: string) => {
  emit('change', code)
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div
    ref="selectRef"
    class="lang-select"
    :class="`lang-select_${variant || 'desktop'}`"
  >
    <button
      type="button"
      class="lang-select__trigger"
      :class="{ 'lang-select__trigger_active': isOpen }"
      @click="toggleDropdown"
    >
      <span class="lang-select__current">{{ currentLocaleName }}</span>
      <svg
        class="lang-select__icon"
        :class="{ 'lang-select__icon_active': isOpen }"
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
      >
        <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>

    <div
      v-if="isOpen"
      class="lang-select__dropdown"
    >
      <button
        v-for="loc in locales"
        :key="loc.code"
        type="button"
        class="lang-select__option"
        :class="{ 'lang-select__option_active': loc.code === currentLocale }"
        @click="selectLocale(loc.code)"
      >
        {{ loc.name }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./LangSelect.scss"></style>
