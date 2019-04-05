<template>
    <img class="loader" :src="src" />
</template>

<script>
export default {
    props: {
        dark: {
            type: Boolean,
            required: false,
            default: false
        }
    },

    computed: {
        /**
         * Get the url of the loader, depending on the dark prop.
         *
         *
         * @computed
         *
         * @return {String}
         *
         */
        src() {
            return this.dark ? '/loading.dark.png' : '/loading.png'
        }
    }
}
</script>
