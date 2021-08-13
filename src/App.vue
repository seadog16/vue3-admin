<template lang="pug">
.clearfix.wrap
    router-view
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "App"
})
</script>

<style lang="stylus" scoped>
.wrap
    height 100%
    min-width 1300px
    width 100%
</style>
