<template lang="pug">
el-container.container
    el-aside.side
    el-container
        el-header.header
        el-main
            router-view
</template>

<script>
export default {
    name: "Layout"
}
</script>

<style scoped lang="stylus">
.side, .header
    background-color #eaeaea

.container
    height 100%
</style>
