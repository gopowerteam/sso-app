import type { App } from 'vue'

type MediaType = 'mobile' | 'desktop'

interface Options {
  breakpoints: { [K in MediaType]: number }
}

function useMediaQuery(query: string) {
  let mediaQuery: MediaQueryList | undefined
  const matches = ref(false)
  const isSupported = globalThis && 'matchMedia' in globalThis && typeof globalThis.matchMedia === 'function'

  const update = () => {
    mediaQuery = globalThis.matchMedia(query)
    matches.value = mediaQuery.matches
  }

  // 在 mounted 时进行调用
  if (isSupported)
    mediaQuery = globalThis!.matchMedia(toValue(query))

  if (mediaQuery && 'addEventListener' in mediaQuery)
    mediaQuery.addEventListener('change', update)

  return { matches, update }
}

export default {
  install: (app: App, options: Options) => {
    const { matches: mobile, update: mobileUpdate } = useMediaQuery(`(max-width: ${options?.breakpoints?.desktop}px)`)
    const { matches: desktop, update: desktopUpdate } = useMediaQuery(`(min-width: ${options?.breakpoints?.desktop}px)`)

    app.config.globalProperties.$viewport = reactive({
      reset: () => {
        mobileUpdate()
        desktopUpdate()
      },
      mobile,
      desktop,
    })
  },
}
