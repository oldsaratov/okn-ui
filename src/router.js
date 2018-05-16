import Vue from 'vue'
import Router from 'vue-router'

import List from './views/List.vue'
import Home from './views/Home.vue'
import Object from './views/Object.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/object/:id',
      name: 'object',
      component: Object
    }
  ]
})
