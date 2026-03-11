import EventLogPage from '@/pages/EventLogPage/ui/EventLogPage.vue'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import ActiveFilePage from '@/pages/ActiveFilePage/ui/ActiveFilePage.vue'
import ArchivePage from '@/pages/ArchivePage/ui/ArchivePage.vue'
Vue.use(VueRouter)
import { Layout } from '@/layout'
import FileDetailsPage from '@/pages/FileDetailsPage/ui/FileDetailsPage.vue'
import { FileReadsPage } from '@/pages/FileReads'

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/events",
    component: Layout,
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
        path: "/events/reads",
        name: "events",
        component: FileReadsPage,
        meta: {
          title: 'Главная',
        },
      },
      {
        path: "/events/writes",
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
        component: FileDetailsPage,
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
