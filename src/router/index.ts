import EventLogPage from '@/pages/EventLogPage/ui/EventLogPage.vue'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import ActiveFilePage from '@/pages/ActiveFilePage/ui/ActiveFilePage.vue'
import FileDetailsPage from '@/pages/FileDetailsPage/ui/FileDetailsPage.vue'
import ReportPage from '@/pages/ReportPage/ui/ReportPage.vue'
import { menuItems } from '../layout/menu-items'
import ArchivePage from '@/pages/ArchivePage/ui/ArchivePage.vue'
Vue.use(VueRouter)
import { Layout } from '@/layout'

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/events",
    component: Layout,
    props: { menu: menuItems },
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
        path: "/active",
        name: "active-files",
        component: ActiveFilePage,
        meta: {
        },
      },

      {
        path: "/archive",
        component: ArchivePage,
        name: "archive",
        meta: {
        },
      },
      {
        path: "/details",
        name: "Детали",
        component: ReportPage,

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
