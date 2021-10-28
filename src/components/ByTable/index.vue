<script lang="jsx">
import { h, defineComponent } from "vue";
import { ElTable, ElTableColumn, ElPagination } from "element-plus";
import TableColumnTag from "./TableColumnTag.vue";

export default defineComponent({
    name: "ByTable",
    components: { TableColumnTag },
    props: {
        data: Array,
        column: Array,
        option: Object,
        page: Object
    },
    setup(props, { emit, slots }) {
        const optTable = {
            stripe: true,
            border: true,
            fit: true,
            "show-header": true,
            "tooltip-effect": "light",
            ...props.option
        };
        const pagiPage = {
            total: 0,
            page: 1,
            sizes: [20, 50, 100, 200],
            size: 20,
            ...props.page
        }
        return () => (
            <div class="tableComponent">
                <ElTable class="table" data={props?.data} {...optTable}>
                    {() => props?.column?.map(v => {
                        const property = (v.property && v.property.table) || {}
                        const slot = v.slot && v.slot.table
                        const options = v.options;
                        let slotTemp = null;
                        if (slot) {
                            slotTemp = slots[slot];
                        } else {
                            if (options) {
                                slotTemp = {
                                    default: ({ row, column, $index }) => {
                                        if ($index > -1) {
                                            return <TableColumnTag options={options} value={row[v.prop]}/>
                                        }
                                    }
                                }
                            }
                        }
                        return (
                            <ElTableColumn {...{prop: v.prop, label: v.label, ...property}}>
                                {slotTemp}
                            </ElTableColumn>
                        )
                    })}
                </ElTable>
                {props.page ? <ElPagination
                    class="pagination"
                    layout="prev,pager,next,sizes,jumper,->,total"
                    total={pagiPage.total}
                    page-size={pagiPage.size}
                    page-sizes={pagiPage.sizes}
                    current-page={pagiPage.page}
                    onCurrentChange={e => emit("page-change", e)}
                    onSizeChange={e => emit("size-change", e)}/> : null}
            </div>
        )
    }
});
</script>

<style scoped lang="stylus">
.tableComponent
    height 100%
    display flex
    flex-direction column

    .table
        flex auto

    .pagination
        margin-top 10px
        flex none
</style>
