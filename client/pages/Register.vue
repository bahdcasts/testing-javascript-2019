<template>
    <div class="container mx-auto flex justify-center">
        <div class="max-w-md-1/2 mx-3 my-12 w-full">
            <h1 class="text-center font-primary font-semibold text-gold">
                Register
            </h1>
            <div class="bg-white shadow-md my-12 p-16 rounded w-full">
                <form @submit.prevent="register">
                    <div class="mb-5">
                        <textbox
                            type="text"
                            name="name"
                            v-model="model.name"
                            v-validate="'required'"
                            :error="errors.first('name')"
                            placeholder="Enter your name"
                        />
                    </div>

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

                    <btn
                        label="Sign up"
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
import { POST_REGISTER } from '@store/modules/auth/actions'

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
            name: '',
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
        async register() {
            const isValid = await this.$validator.validate()

            if (!isValid) {
                return
            }

            this.toggleLoading()

            this.$store
                .dispatch(POST_REGISTER, this.model)
                .then(() => {
                    this.toggleLoading()

                    this.flash('Succesfully registered.')

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
