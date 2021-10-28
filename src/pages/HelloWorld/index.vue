<template lang="pug">
.page
    by-table-search.search(:option="searchTable")
    by-table.table(
        :data="tableData"
        :column="tableColumn"
        :page="page"
        @page-change="pageChange"
        @size-change="sizeChange")
        template(#age="{row}")
            span {{row}}
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: 'HelloWorld',
    data() {
        return {
            tableData: [
                {
                    name: "曾志伟",
                    age: 56,
                    gender: 1
                },
                {
                    name: "吴君如",
                    age: 52,
                    gender: 2
                },
                {
                    name: "吴孟达",
                    age: 60,
                    gender: 3
                }
            ],
            tableColumn: [
                {
                    label: "#",
                    property: {
                        table: {
                            type: "index",
                            align: "center"
                        }
                    }
                },
                {
                    label: "姓名",
                    prop: "name",
                    property: {
                        table: {
                            width: 200
                        }
                    }
                },
                {
                    label: "年龄",
                    prop: "age",
                    slot: {
                        table: "age"
                    },
                },
                {
                    label: "性别",
                    prop: "gender",
                    options: [
                        {
                            label: "男",
                            value: 1
                        },
                        {
                            label: "女",
                            value: 2
                        }
                    ]
                }
            ],
            page: {
                page: 1,
                total: 100,
                size: 20
            },

        }
    },
    computed: {
        searchTable() {
            const filterProp = ["name", "gender"]
            return this.tableColumn.filter(v => filterProp.includes(v.prop))
        }
    },
    methods: {
        pageChange(e) {
            console.log("page-change", e);
        },
        sizeChange(e) {
            console.log("size-change", e);
        }
    }
})
</script>

<style scoped lang="stylus">
.page
    display flex
    flex-direction column
    height 100%

    .search
        flex none

    .table
        flex auto
</style>
