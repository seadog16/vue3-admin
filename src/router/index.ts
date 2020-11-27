import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// NProgress 配置
NProgress.configure({ showSpinner: false });

const routes: Array<RouteRecordRaw> = [
    {
        path: "login",
        name: "Login",
        component: () => import("@/views/Login/index.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

let isRoute = false;
router.beforeEach((to: any, from, next) => {
    NProgress.start();
    const whiteList = [/^\/login/, /^\/register/, /^\/home/];
    const isWhite = whiteList.some(v => v.test(to.fullPath));
    if (isWhite) {
        if (/^\/login/.test(to.fullPath)) isRoute = false;
        next();
    } else {
        const token = window.sessionStorage.getItem("token");
        if (token) {
            if (!isRoute) {
                const storeSys = getModule(Sys, store);
                Promise.all([storeSys.queryMenuTree(), storeSys.queryUserInfo(), storeSys.queryMenus()])
                    .then(() => {
                        // const [r]: any[] = storeSys.menus.filter((v: any) => Boolean(v.component));
                        const layout: any = {
                            path: "/",
                            name: "Layout",
                            // redirect: r?.uri,
                            component: () => import("@/views/Layout/index.vue"),
                            children: []
                        };
                        layout.children.push(
                            ...(storeSys.menus
                                .filter((v: any) => Boolean(v.component))
                                .map((v: any) => {
                                    return {
                                        path: v.uri,
                                        name: v.code,
                                        meta: {
                                            name: v.menu,
                                            component: v.component
                                        },
                                        component: () => import(`@/views/${v.component}.vue`)
                                    };
                                }) as any[])
                        );
                        router.addRoutes([layout]);
                        isRoute = true;
                        if (storeSys.role !== "system") {
                            if (storeSys.userInfo.status === 3) {
                                if (to.fullPath.match(/^\/center/)) next("/user/account");
                                else next({ ...to, replace: true });
                            } else {
                                next({
                                    path: "information",
                                    query: {
                                        active: storeSys.userInfo.status || 0
                                    }
                                });
                            }
                        } else {
                            next({ ...to, replace: true });
                        }
                    })
                    .catch(() => {
                        isRoute = false;
                        next();
                    });
            } else {
                next();
            }
        } else {
            isRoute = false;
            next("/login");
        }
    }
});
router.afterEach(() => {
    NProgress.done();
});
export default router;


