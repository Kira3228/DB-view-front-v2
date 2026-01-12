import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import { VDataTable, VPagination } from 'vuetify/lib';
import ru from "vuetify/src/locale/ru";

Vue.use(Vuetify, {
    components: {
        VDataTable,
        VPagination,
    },
});

const vuetify = new Vuetify({
    lang: {
        locales: { ru },
        current: "ru",
    },
    components: {
        VDataTable,
        VPagination,
    },

}); export default vuetify;
