<template>
    <h1 class="text-center">Confirming Email ...</h1>
</template>

<script>
import { POST_EMAIL_CONFIRM } from '@store/modules/auth/actions'

export default {
    mounted() {
        this.$store
            .dispatch(POST_EMAIL_CONFIRM, { token: this.$route.params.token })
            .then(response => {
                this.setAuth(response.data.data)

                this.flash('Email confirmed.')

                this.$router.push('/')
            })
    }
}
</script>
