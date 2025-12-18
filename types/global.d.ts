import type { Ref } from 'vue'

declare module '#app' {
  interface NuxtApp {
    $globalContext: {
      currentPath: Ref<string>
      setPath: (path: string) => void
    }
  }
}

export {}
