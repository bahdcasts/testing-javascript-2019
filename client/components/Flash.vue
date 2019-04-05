<template>
    <div>
        <div
            class="border-t border-b text-white font-bold text-center px-4 py-5"
            :class="{
                'bg-green': message.type === 'success',
                'bg-red': message.type === 'error'
            }"
            v-for="message in messages"
            :key="message.id"
        >
            <p class="text-lg">{{ message.message }}</p>
        </div>
    </div>
</template>
