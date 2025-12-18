import { ref } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  const currentPath = ref(nuxtApp._route?.fullPath || '/')

  nuxtApp.hook('page:finish', () => {
    currentPath.value = nuxtApp._route?.fullPath || '/'
  })

  const setPath = (path: string) => {
    currentPath.value = path
  }

  return {
    provide: {
      globalContext: {
        currentPath,
        setPath
      }
    }
  }
})
