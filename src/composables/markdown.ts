import type MarkdownIt from 'markdown-it'
// import emoji from 'markdown-it-emoji'
// import abbr from 'markdown-it-abbr'
// import footnote from 'markdown-it-footnote'
// import sub from 'markdown-it-sub'
// import sup from 'markdown-it-sup'
import type matter from 'gray-matter-browser'
// import hljs from 'markdown-it-highlightjs'

// const [
//   { default: MarkdownIt2 },
//   { default: emoji },
//   { default: abbr },
//   { default: footnote },
//   { default: sub },
//   { default: sup },
//   { default: matter2 },
//   { default: hljs },
// ] =

const modules = Promise.all([
  import('markdown-it'),
  import('markdown-it-emoji'),
  import('markdown-it-abbr'),
  import('markdown-it-footnote'),
  import('markdown-it-sub'),
  import('markdown-it-sup'),
  import('gray-matter-browser'),
  import('markdown-it-highlightjs'),
])

let md: MarkdownIt | null = null
export async function useMarkdownIt(): Promise<MarkdownIt> {
  if (md != null) return md
  const [
    { default: MarkdownIt2 },
    { default: emoji },
    { default: abbr },
    { default: footnote },
    { default: sub },
    { default: sup },
    // eslint-disable-next-line no-empty-pattern
    {},
    { default: hljs },
  ] = await modules
  md = new MarkdownIt2({
    html: true,
    linkify: false,
  })

  md.use(emoji).use(abbr).use(footnote).use(sub).use(sup).use(hljs)
  return md
}

export async function useMarkdown(
  markdown: string
): Promise<[string, matter.GrayMatterFile<string>]> {
  const { default: matter2 } = (await modules)[6]
  const file = matter2(markdown)
  const md = await useMarkdownIt()
  return [md.render(file.content), file]
}
