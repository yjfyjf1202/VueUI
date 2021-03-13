<template>
    <div class="font">
        <el-form :inline="true" :model="options"   class="demo-form-inline">
            <el-form-item>
                <el-select v-model="query2.salary_lv" clearable placeholder="行业分类">
                    <el-option v-for="item in options.res_lv"
                            :label="item.salary_url"
                            :key="item.salary_lv"
                            :value="item.salary_lv"
                    >


                    </el-option>

                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="screenInfo">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table
                :data="tableData"
                style="width: 100%"
                height="100%">
            <el-table-column
                    fixed
                    prop="job"
                    label="岗位"
                    width="234"
            >
            </el-table-column>
            <el-table-column
                    prop="corps"
                    label="公司"
                    width="234">
            </el-table-column>
            <el-table-column
                    prop="salary"
                    label="薪酬"
                    width="234">
            </el-table-column>
            <el-table-column
                    prop="location"
                    label="工作地点"
                    width="234">
            </el-table-column>
            <el-table-column
                    prop="time"
                    label="发布时间"
                    width="234">
            </el-table-column>

            <el-table-column
                    fixed="right"

                    label="操作"
                    width="400"

            >
                <template slot-scope="scope">
                    <el-button
                            type="primary"
                            @click="getInfomation(scope.row)"
                    >查看岗位详情页</el-button>


                </template>


            </el-table-column>


        </el-table>
        <el-dialog
                title="岗位介绍"
                :visible.sync="centerDialogVisible"
                width="40%"
                center>
            <el-input type="textarea" :value="introduction" readonly rows="10" autosize>
                <el-button @click="dialogProgressVisible=false"></el-button>
            </el-input>

            <el-button type="primary" @click="centerDialogVisible = false">关闭</el-button>

        </el-dialog>
        <el-button-group>
            <el-button type="primary" @click="PageDown" icon="el-icon-arrow-left">上一页</el-button>
            <el-button type="primary" v-text="i"></el-button>
            <el-button type="primary" @click="PageUp">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-button-group>

    </div>
</template>

<script>
    import {fetchData} from "../../../api";
    export default {
        name: "lyrc",
        data() {
            return {
                query:{
                    url:'',
                    page:'',
                    salary_lv:''
                },
                query2:{
                  url:'',
                    page:'',
                    salary_lv:''

                },
                tableData:[{}],
                introduction:'',
                centerDialogVisible:false,
                i:1,
                options:{},
                value:''

            }
        },
        created() {
            this.getLYRCJob()
        },
        methods:{
            getLYRCJob:function() {
                this.query.url='http://127.0.0.1:8000/LYRC/getLYRCJob'
                fetchData(this.query).then(res=>{
                    this.tableData=res
                    this.options=this.tableData[20]
                    // this.options.append(this.tableData[20])
                    // console.log(this.options.res_lv[0].salary_lv)
                })
            },
            PageUp:function () {
                this.i = this.i+1
                this.getNextPage(this.i)
            },

            PageDown:function () {
                if(this.i>1){
                    this.i=this.i-1
                    this.getNextPage(this.i)
                }
                else {
                    this.$message({
                        message:"这是第1页",
                        type:'warning'
                    })
                }

            },

            getNextPage:function (page) {
                var p = page
                this.query.page=p
                this.query.url='http://127.0.0.1:8000/LYRC/getLYRCJob?page='+p+"&lv="+this.query2.salary_lv
                fetchData(this.query).then(res=>{
                    this.tableData=res


                })
            },
            checkInfo:function () {

            },
            getInfomation:function(data){
                var url
                // console.log(data)
                url=data.url
                window.open(url)

            },
            screenInfo:function () {
                    // console.log(this.query.salary_lv)
                this.query2.url="http://127.0.0.1:8000/LYRC/gscreenInfo?lv="+this.query2.salary_lv
                fetchData(this.query2).then(res=>{
                    console.log(res)
                    this.tableData=res
                })
                this.i=1



            }
        },

    }
</script>

<style scoped>
    .font{
        font-size: 60px;
        height: 90%;
    }
</style>