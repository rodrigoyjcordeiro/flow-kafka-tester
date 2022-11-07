import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { loadFonts } from './plugins/webfontloader'
import { Quasar, Notify } from 'quasar';

import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'

import 'quasar/src/css/index.sass'


loadFonts()

createApp(App)
  .use(Quasar, {
    plugins: {Notify}
  })
  .use(router)
  .mount('#app')
