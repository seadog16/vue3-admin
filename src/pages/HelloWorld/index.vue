<template lang="pug">
el-table.table
    el-table-column(label="名字")
    el-table-column(label="性别")
    el-table-column(label="年龄")
</template>

<script lang="ts">
import {ref, defineComponent} from 'vue'

export default defineComponent({
    name: 'HelloWorld',
    setup: () => {
        const count = ref(0)
        return {count}
    }
})
</script>

<style scoped lang="stylus">
.table
    height 100%
</style>
