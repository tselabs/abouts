export const renderMain = async (url: string): Promise<[string, any]> => {
  const { useMarkdown } = await import('../composables/markdown')
  const resp = await fetch(url)
  const source = await resp.text()

  const [md, file] = await useMarkdown(source)
  return [md, file.data]
}

export const renderByWorker = async (url: string): Promise<[string, any]> => {
  const resp = await fetch(`/__sw/render${url}`)
  const body = await resp.json()
  if (body.err !== false) {
    throw body.r
  }

  return body.r
}

const pInlinePages = import('virtual:markdown-precache')

export const render = async (url: string): Promise<[string, any]> => {
  try {
    const { default: inlinePages } = await pInlinePages
    if (inlinePages[url] != null) {
      return inlinePages[url]
    } else {
      if ('serviceWorker' in navigator) {
        const reg = await navigator.serviceWorker.ready
        if (reg.active != null) return await renderByWorker(url)
        return await renderMain(url)
      }
    }
    return await renderMain(url)
  } catch {
    return await renderMain(url)
  }
}
