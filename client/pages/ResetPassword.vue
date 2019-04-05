<template>
    <div class="container mx-auto flex justify-center">
        <div class="max-w-md-1/2 mx-3 my-12 w-full">
            <h1 class="text-center font-primary font-semibold text-gold">
                Reset Password
            </h1>
            <div class="bg-white shadow-md my-12 p-16 rounded w-full">
                <form @submit.prevent="resetPassword">
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
                            placeholder="Enter your new password"
                        />
                    </div>

                    <btn
                        type="submit"
                        :loading="loading"
                        :disabled="loading"
                        label="Reset Password"
                    />
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import FormMixin from '@client/mixins/form'
import Textbox from '@components/Textbox.vue'
import { POST_RESET_PASSWORD } from '@store/modules/auth/actions'

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
            email: ''
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
         * Make api request to request password reset for user
         *
         * @method
         *
         * @return {null}
         *
         */
        async resetPassword() {
            const isValid = await this.$validator.validate()

            if (!isValid) {
                return
            }

            this.toggleLoading()

            this.$store
                .dispatch(POST_RESET_PASSWORD, {
                    ...this.model,
                    token: this.$route.params.token
                })
                .then(() => {
                    this.toggleLoading()

                    this.flash('Password reset successfully.')

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
