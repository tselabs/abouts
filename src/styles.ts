import { useProgress } from '@marcoschulte/vue3-progress'
import 'uno.css'
import 'virtual:unocss-devtools'
import './index.css'
import('highlight.js/styles/github-dark.css')
export const font = [
  import('misans/lib/misans-400-normal.min.css'),
  import('misans/lib/misans-100-thin.min.css'),
  import('misans/lib/misans-200-extralight.min.css'),
  import('misans/lib/misans-300-light.min.css'),
  import('misans/lib/misans-400-regular.min.css'),
  import('misans/lib/misans-500-medium.min.css'),
  import('misans/lib/misans-600-demibold.min.css'),
  import('misans/lib/misans-600-semibold.min.css'),
  import('misans/lib/misans-700-bold.min.css'),
  import('misans/lib/misans-900-heavy.min.css'),
]

const progress = useProgress()
void progress.attach(Promise.all(font))
