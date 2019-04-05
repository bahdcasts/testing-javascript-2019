<template>
    <div>
        <input
            :type="type"
            :name="name"
            :value="value"
            @blur="$emit('blur')"
            @input="updateValue"
            @change="updateValue"
            @focus="$emit('focus')"
            :placeholder="placeholder"
            class="focus:outline-none w-full p-6 bg-brown-lightest text-brown"
        />

        <span v-if="error" class="text-sm text-red-light mt-2 block">{{
            error
        }}</span>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: false,
            default: 'text'
        },
        value: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: true
        },
        error: {
            type: String,
            required: false
        }
    },

    methods: {
        /**
         * Update input's value
         *
         * @param {Object} event
         *
         * @return {Null}
         *
         */
        updateValue($event) {
            this.$emit('input', $event.target.value)
        }
    }
}
</script>
