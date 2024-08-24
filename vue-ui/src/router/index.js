import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import G6Editor from '../components/G6Editor/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HelloWorld
  },
  {
    path: '/HelloWorld',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/G6Editor',
    name: 'G6Editor',
    component: G6Editor
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router