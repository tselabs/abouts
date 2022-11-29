/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.md?static' {
  const markdown: [string, Readonly<Record<string, any>>]
  export default markdown
}

declare module 'virtual:markdown-precache' {
  const precache: Record<string, [string, Readonly<Record<string, any>>]>
  export default precache
}

declare module 'markdown-it-*' {
  import type MarkdownIt from 'markdown-it'
  const plugin: (md: MarkdownIt) => void
  export default plugin
}
