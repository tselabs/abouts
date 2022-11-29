import { createFilter } from '@rollup/pluginutils'
import { useMarkdown } from './markdown-sw'
import { readFile } from 'fs/promises'
import { Plugin } from 'vite'
import path from 'path'

const templateStatic = (path: string, content: string): string => (`/* Static Markdown from "${path}" */\n;const markdown = (${content}); export default markdown;`)

export default (precache: readonly string[] = [], root = process.cwd(), starts = '/') => {
  const cached = new Map<string, string>()

  const fetchCache = async (path: string): Promise<string> => {
    const r = await useMarkdown(await readFile(path, 'utf-8'))
    const content = JSON.stringify(
      [r[0], r[1].data]
    )
    const code = templateStatic(path, content)
    cached.set(path, content)
    return code
  }

  const filter = createFilter('**/*.md?static')

  const precached = (async () => {
    const p = await Promise.all(precache.map((path) => fetchCache(path)))
    const output: Record<string, any> = {}
    precache.forEach((v) => (output[starts + path.relative(root, v)] = JSON.parse(cached.get(v))))
    return `/* Markdown Precache (${precache.length}) */\n;const precache = (Object.freeze(${JSON.stringify(output)}));export default precache;`
  })()

  return {
    name: 'static-markdown',
    resolveId(id) {
      if (id === 'virtual:markdown-precache') {
        return id
      }
    },
    async load(id) {
      if (id === 'virtual:markdown-precache') {
        return {
          code: await precached
        }
      } else if (filter(id)) {
        const matched = id.match(/^(.*\.md)\?static$/)?.[1]!

        if (cached.has(matched)) {
          return templateStatic(matched, cached.get(matched)!)
        } else {
          return {
            code: await fetchCache(matched),
          }
        }
      }
    },
  } as Plugin
}
