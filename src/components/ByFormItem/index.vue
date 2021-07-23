<script lang="tsx">
import { h, defineComponent, ref } from "vue";
import { ElFormItem, ElInput, ElSelect, ElOption } from "element-plus";

export default defineComponent({
    name: "ByFormItem",
    props: {
        option: {
            type: Object,
            default: {
                label: "",
            }
        },
        modelValue: [String, Number, Array, Object]
    },
    setup(props, ctx) {
        const { options } = props.option;
        let ctl = <ElInput model-value={props.modelValue} on-change={e => ctx.emit("update:modelValue", e)}/>
        console.log(ctx);
        if (options) {
            ctl =
                <ElSelect model-value={props.modelValue} on-change={e => ctx.emit("update:modelValue", e)}>
                    {options.map(v => <ElOption label={v.label} value={v.value}/>)}
                </ElSelect>
        }
        return () =>
            <ElFormItem label={props.option.label}>
                {ctl}
            </ElFormItem>
    }
});
</script>

<style scoped lang="stylus">

</style>
