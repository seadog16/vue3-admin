import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login/index.vue")
    },
    {
        path: "/404",
        name: "NotFound",
        component: () => import("@/views/NotFound/index.vue")
    },
    {
        path: "/",
        component: () => import("@/views/Layout/index.vue"),
        children: [
            {
                path: "helloworld",
                name: "HelloWorld",
                component: () => import("@/pages/HelloWorld/index.vue")
            }
        ]
    }
];

const router = createRouter({
    routes,
    history: createWebHashHistory()
});

export default router;
