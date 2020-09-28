import Router from "vue-router";
import Vue from "vue";
Vue.use(Router);

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('./ui/pages/Home')
    },
    {
        path: '/subjects',
        name: 'Subjects',
        component: () => import('./ui/pages/Subject')
    },
    {
        path: '*',
        name: 'NotFound',
        component: () => import("./ui/pages/NotFound"),
    }
]

const router = new Router({
    mode: "history",
    routes
});

export default router;