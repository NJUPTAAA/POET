import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import ProblemEditor from '../views/ProblemEditor.vue';

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'landing-page',
    //   component: require('@/components/LandingPage').default,
    // },
    // {
    //   path: '/',
    //   redirect: '/',
    // },
    {
      path:'/problemEditor',
      name:'problemEditor',
      component: ProblemEditor
    }
  ],
});
