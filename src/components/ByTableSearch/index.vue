<template lang="pug">
el-form(inline :model="searchData")
    by-form-item(
        v-for="opt in option"
        :option="opt"
        v-model="searchData[opt.prop]")
</template>

<script>
import { defineComponent } from "vue";
import ByFormItem from "@/components/ByFormItem/index.vue";

export default defineComponent({
    name: "ByTableSearch",
    components: { ByFormItem },
    props: {
        option: Array
    },
    data() {
        return {
            searchData: {}
        }
    }
});
</script>

<style scoped lang="stylus">

</style>
