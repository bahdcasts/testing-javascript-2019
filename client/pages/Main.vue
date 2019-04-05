<template>
    <div class="w-full">
        <flash />
        <div class="page pb-16 ">
            <topbar />
            <div class="my-16">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import Flash from '@components/Flash.vue'
import Topbar from '@components/Topbar.vue'

export default {
    components: {
        Flash,
        Topbar
    }
}
</script>
