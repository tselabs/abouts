import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import Container from './components/Container.vue'
import Navbar from './components/Navbar.vue'
import { ProgressBar } from '@marcoschulte/vue3-progress'

export const App = defineComponent({
  name: 'App',
  setup() {
    return () => (
      <>
        <ProgressBar />
        <Navbar />
        <Container>
          <RouterView />
        </Container>
      </>
    )
  },
})
