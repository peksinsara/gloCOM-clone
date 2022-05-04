import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView'
import ChatView from '../views/ChatView'

Vue.use(VueRouter)

  const routes = [
    { path: "/", component: HomeView, name: "HomeView"},
    { path: "/chat", component: ChatView, name: "ChatView"},

]

const router = new VueRouter({
  routes,
  mode: "history"
})

export default router