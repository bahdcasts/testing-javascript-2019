<template>
    <div class="container mx-auto flex justify-center">
        <div class="max-w-md-1/2 mx-3 my-12 w-full">
            <h1 class="text-center font-primary font-semibold text-gold">
                Login
            </h1>
            <div class="bg-white shadow-md my-12 p-16 rounded w-full">
                <form @submit.prevent="login">
                    <div class="mb-5">
                        <textbox
                            name="email"
                            type="email"
                            v-model="model.email"
                            v-validate="'required|email'"
                            :error="errors.first('email')"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div class="mb-5">
                        <textbox
                            name="password"
                            type="password"
                            v-model="model.password"
                            v-validate="'required|min:6'"
                            :error="errors.first('password')"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div class="text-center my-12">
                        <router-link
                            to="/auth/passwords/email"
                            class="font-primary text-brown no-underline"
                        >
                            Forgot Password ?
                        </router-link>
                    </div>

                    <btn
                        label="Sign in"
                        type="submit"
                        :loading="loading"
                        :disabled="loading"
                    />
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import FormMixin from '@client/mixins/form'
import Textbox from '@components/Textbox.vue'
import { POST_LOGIN, SET_AUTH } from '@store/modules/auth/actions'

export default {
    mixins: [FormMixin],

    components: {
        Textbox
    },

    /**
     * Define the data for this component
     *
     * @data
     *
     * @return {Object}
     *
     */
    data: () => ({
        formstate: {},
        model: {
            email: '',
            password: ''
        }
    }),

    /**
     *
     * Define methods for this component
     *
     * @type {Object}
     *
     */
    methods: {
        /**
         * Make api request to register a user
         *
         * @method
         *
         * @return {null}
         *
         */
        async login() {
            const isValid = await this.$validator.validate()

            if (!isValid) {
                return
            }

            this.toggleLoading()

            this.$store
                .dispatch(POST_LOGIN, this.model)
                .then(response => {
                    this.toggleLoading()

                    this.flash('Succesfully logged in.')

                    this.setAuth(response.data.data)

                    this.$router.push('/')
                })
                .catch(({ response }) => {
                    this.toggleLoading()

                    Object.keys(response.data.data.errors).forEach(field => {
                        this.errors.add({
                            field,
                            msg: response.data.data.errors[field]
                        })
                    })
                })
        }
    }
}
</script>
