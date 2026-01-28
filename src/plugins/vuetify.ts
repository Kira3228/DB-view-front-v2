import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import ru from "vuetify/src/locale/ru";

Vue.use(Vuetify);

const vuetify = new Vuetify({
    theme: { dark: false },
    lang: {
        locales: { ru },
        current: "ru",
    },

}); 
export default vuetify;
