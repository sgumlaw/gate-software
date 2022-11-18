import Vue from 'vue'
import VueRouter from 'vue-router'
import GateCalculator from '../views/GateCalculator.vue'
import Render from '../views/Render.vue';

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/gates/create',
    component: GateCalculator,
    name: 'GateCalculator'
    
},
  
  {
    path: '/gates/{gate}',
    component: Render,
    name: 'render'
    
},

]

const router = new VueRouter({
  routes
})

export default router
