import EventLogPage from '@/pages/EventLogPage/ui/EventLogPage.vue'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import ActiveFilePage from '@/pages/ActiveFilePage/ui/ActiveFilePage.vue'
import ArchivePage from '@/pages/ArchivePage/ui/ArchivePage.vue'
import { Layout } from '@/layout'
import FileDetailsPage from '@/pages/FileDetailsPage/ui/FileDetailsPage.vue'
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
