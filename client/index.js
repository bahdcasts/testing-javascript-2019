import Vue from 'vue'
import Router from 'vue-router'
import Validator from 'vee-validate'

import '@client/styles/main.css'
import store from '@client/store'
import Main from '@pages/Main.vue'
import router from '@client/routes'
import auth from '@client/mixins/auth'
import flash from '@client/mixins/flash'
import Button from '@components/Button.vue'
import Loader from '@components/Loader.vue'

Vue.use(Router)
Vue.mixin(auth)
Vue.mixin(flash)
Vue.use(Validator)

Vue.component('btn', Button)
Vue.component('loader', Loader)

export default new Vue({ el: '#app', router, store, render: h => h(Main) })
