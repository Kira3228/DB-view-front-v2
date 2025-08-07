import EventLogPage from '@/pages/EventLogPage/ui/EventLogPage.vue'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import MainMenu from "./../shared/UI/Menu/Menu.vue"
import ActiveFilePage from '@/pages/ActiveFilePage/ui/ActiveFilePage.vue'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/events",
    component: MainMenu,
    children: [
      {
        path: "/events",
        name: "events",
        component: EventLogPage,
        meta: {
          title: 'Главная',

        },
      },
      {
        path: "/active-files",
        name: "active-files",
        component: ActiveFilePage,
        meta: {
        },
      },
      {
        path: "/archive",
        name: "archive",
        component: EventLogPage,

        meta: {
        },
      },
      {
        path: "/details",
        component: EventLogPage,
        name: "details",
        meta: {
        },
      },
      {
        path: "/report-list",
        name: "report-list",
        component: EventLogPage,

        meta: {
        }
      },
      {
        path: "/settings",
        name: "settings",
        component: EventLogPage,

        meta: {
        }
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
