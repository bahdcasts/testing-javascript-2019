export default {
    data: () => ({
        loading: false
    }),

    methods: {
        /**
         * Toggle the loading state of this component
         *
         * @return {Null}
         *
         */
        toggleLoading() {
            this.loading = !this.loading
        }
    }
}
