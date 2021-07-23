<template lang="pug">
el-tag.tag(
    v-if="index > -1"
    disable-transitions
    :type="tagType"
    effect="plain"
    size="small") {{txt}}
span(v-else) {{value}}
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "TableColumnTag",
    props: {
        options: Array,
        value: [Number, String]
    },
    data() {
        return {
            type: ["", "success", "info", "warning", "danger"]
        }
    },
    computed: {
        index() {
            return this.options.findIndex(v => String(v.value) === String(this.value));
        },
        tagType() {
            return this.type[this.index % this.type.length];
        },
        txt() {
            return this.options[this.index]["label"];
        }
    }
});
</script>
<style lang="stylus" scoped>
.tag
    height 23px
</style>
