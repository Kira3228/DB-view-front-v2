import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { Layout } from '@/layout'
import { EventsPage } from '@/pages/EventsPage'
import ManagementPage from '@/pages/ManagementPage/ManagementPage.vue'
import ReportPage from '@/pages/ReportPage/ReportPage.vue'
import SettingsPage from '@/pages/SettingsPage/SettingsPage.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/events",
    component: Layout,
    children: [
      {
        path: "/events",
        name: "events",
        component: EventsPage,
        meta: {
          title: 'Главная',
        },
      },
      {
        path: "/management",
        component: ManagementPage,
        name: "management",
        meta: {
        },
      },
      {
        path: "/reports",
        component: ReportPage,
        name: "reports",
        meta: {
        },
      },
      {
        path: "/settings",
        component: SettingsPage,
        name: "settings",
        meta: {
        },
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
