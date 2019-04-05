import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import auth from '@store/modules/auth'
import flash from '@store/modules/flash'

Vue.use(Vuex)

export default new Store({
    modules: {
        auth,
        flash
    }
})
