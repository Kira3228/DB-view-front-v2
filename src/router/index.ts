import EventLogPage from '@/pages/EventLogPage/ui/EventLogPage.vue'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import MainMenu from "./../shared/UI/Menu/Menu.vue"
import ActiveFilePage from '@/pages/ActiveFilePage/ui/ActiveFilePage.vue'
import FileDetailsPage from '@/pages/FileDetailsPage/ui/FileDetailsPage.vue'
import ReportPage from '@/pages/ReportPage/ui/ReportPage.vue'
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
        path: "/details",
        component: FileDetailsPage,
        name: "details",
        meta: {
        },
      },
      {
        path: "/report-list",
        name: "report-list",
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
