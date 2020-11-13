import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
console.log(`router`);

export default new Router({
    mode: 'history',
    base: '/trainings',
    routes: [
        {
            path: '/',
            component: () => import('@/components/EmptyState'),
            children: [],
        },
        {
            path: '/create',
            component: () => import('@/components/EmptyState'),
            children: [],
        },
        {
            path: '/about',
            component: () => import('@/components/About'),
            children: [],
        },
    ],
});
