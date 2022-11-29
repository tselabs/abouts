import MarkdownIt from 'markdown-it'
import emoji from 'markdown-it-emoji'
import abbr from 'markdown-it-abbr'
import footnote from 'markdown-it-footnote'
import sub from 'markdown-it-sub'
import sup from 'markdown-it-sup'
import matter from 'gray-matter-browser'
import hljs from 'markdown-it-highlightjs'

let md: MarkdownIt | null = null
export async function useMarkdownIt(): Promise<MarkdownIt> {
  if (md != null) return md
  md = new MarkdownIt({
    html: true,
    linkify: false,
  })

  md.use(emoji).use(abbr).use(footnote).use(sub).use(sup).use(hljs)
  return md
}

export async function useMarkdown(
  markdown: string
): Promise<[string, matter.GrayMatterFile<string>]> {
  const file = matter(markdown)
  const md = await useMarkdownIt()
  return [md.render(file.content), file]
}
