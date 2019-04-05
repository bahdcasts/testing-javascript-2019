<template>
    <button
        :type="type"
        :disabled="disabled"
        :class="{
            'bg-emerald-light cursor-not-allowed': loading,
            'bg-emerald': !loading
        }"
        class="focus:outline-none rounded-sm hover:bg-emerald-light px-4 py-5 w-full text-white text-xl"
    >
        <loader v-if="loading" />
        <span v-else>{{ label }}</span>
    </button>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: false,
            default: 'button'
        },
        loading: {
            type: Boolean,
            required: false,
            default: false
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        }
    }
}
</script>
