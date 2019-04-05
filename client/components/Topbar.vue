<template>
    <div>
        <div
            role="alert"
            v-if="auth && !confirmed"
            class="border-t border-b text-brown bg-gold-lightest font-bold text-center px-4 py-5"
        >
            <p class="text-lg">
                Please confirm your email address. Didn&rsquo;t receive an email
                ?
                <span
                    @click="resentConfirmEmail"
                    class="cursor-pointer underline text-brown ml-4"
                >
                    Click here to resend email.
                </span>
            </p>
        </div>

        <div class="h-2 bg-gold"></div>

        <nav class="py-5 mx-10 flex justify-between items-center">
            <logo />
            <div class="lg:inline-block" v-if="!auth">
                <router-link
                    to="/auth/login"
                    class="no-underline text-white mr-6 text-brown hover:text-brown-darkest trans-30"
                >
                    Sign In
                </router-link>

                <router-link
                    to="/auth/register"
                    class="no-underline focus:outline-none text-white px-3 py-2 border-2 inline border-brown hover:border-brown-darkest rounded-full text-brown hover:text-brown-darkest trans-30"
                >
                    Join Now
                </router-link>
            </div>
            <div class="flex items-center" v-else>
                <span class="cursor-pointer hover:text-brown-darker text-brown">
                    Hey, <strong>{{ user.name }}</strong>
                </span>

                <span
                    @click="unsetAuth"
                    class="ml-8 cursor-pointer hover:text-brown-darker text-brown"
                >
                    Logout
                </span>
            </div>
        </nav>
    </div>
</template>

<script>
import Logo from '@components/Logo.vue'

export default {
    components: {
        Logo
    }
}
</script>
