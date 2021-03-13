<template>
    <div class="font">
        <el-form :inline="true" :model="options" class="demo-form-inline">
            <el-form-item>
                <el-select v-model="query3.hy" clearable placeholder="行业分类">
                    <el-option
                        v-for="item in options.r_hy"
                        :key="item.url"
                        :label="item.key"
                        :value="item.url"

                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="query3.zy" clearable placeholder="职业类型">
                    <el-option
                            v-for="item in options.r_zy"
                            :key="item.url"
                            :label="item.key"
                            :value="item.url"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="query3.yx" placeholder="月薪范围" clearable>
                    <el-option
                            v-for="item in options.r_yx"
                            :key="item.url"
                            :label="item.key"
                            :value="item.url"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="query3.we" placeholder="工作经验" clearable>
                    <el-option
                            v-for="item in options.r_we"
                            :key="item.url"
                            :label="item.key"
                            :value="item.url"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="query3.ed" placeholder="学历要求" clearable>
                    <el-option
                            v-for="item in options.r_ed"
                            :key="item.url"
                            :label="item.key"
                            :value="item.url"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="query3.wt" placeholder="任职类型" clearable>
                    <el-option
                            v-for="item in options.r_wt"
                            :key="item.url"
                            :label="item.key"
                            :value="item.url"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="query3.rt" placeholder="发布时间" clearable>
                    <el-option
                            v-for="item in options.r_rt"
                            :key="item.url"
                            :label="item.key"
                            :value="item.url"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="ScreenText">查询</el-button>
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

                prop="corp"
                label="公司"
                width="234">
        </el-table-column>
        <el-table-column
                prop="location"
                label="地点"
                width="234">
        </el-table-column>
        <el-table-column
                prop="time"
                label="发布时间"
                width="234">
        </el-table-column>
        <el-table-column
                prop="order"
                label="要求"
                width="250">
        </el-table-column>

        <el-table-column
                fixed="right"

                label="操作"
                width="400"

        >
            <template slot-scope="scope">
                <el-button
                        type="primary"
                         @click="getIntroduction(scope.row)"
                >查看岗位介绍</el-button>

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
        name:"getjoblist",

        data() {


            return {
               query:{
                   url:'',
                   page:''
               }
                ,
                query2:{
                  url:''
                },
                query3:{
                    url:'',
                    hy:'',
                    yx:'',
                    we:'',
                    rt:'',
                    wt:'',
                    zy:'',
                    ed:'',
                },

                options:{



                },
                tableData:[{
                   jobtype:'',
                    kywd:''
                }],
                jobtype: ""
                ,
                introduction:'',
                centerDialogVisible:false,
                i:1

            }
        },
        created() {
            this.getAllJob()
        },
        methods:{
            getAllJob:function () {
                this.query.url='http://127.0.0.1:8000/LOGIN/getJobList'
                fetchData(this.query).then(res=>{
                    this.tableData=res
                })
                this.getSelect()
            },

            getIntroduction:function (data) {
                // console.log(data)
                this.introduction=data.introduction
                this.centerDialogVisible=true;
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
                    var p = "p"+page
                this.query.page=p
                console.log(this.query.page)
                this.query.url='http://127.0.0.1:8000/LOGIN/ScreenQCWYData?hy='+this.query3.hy+'&ed='+this.query3.ed+'&we='+this.query3.we+'&rt='+this.query3.rt+'&yx='+this.query3.yx+'&wt='+this.query3.wt+'&zy='+this.query3.zy+'&page='+p
                fetchData(this.query).then(res=>{
                    this.tableData=res
                    // this.getIntroduction(tableData[])
                    // this.introduction=res.introduction
                })
            },
           getSelect:function () {
                this.query2.url='http://127.0.0.1:8000/LOGIN/qcwyScreen'
               fetchData(this.query2).then(res=>{
                   this.options=res
                   console.log(this.options)
                   // this.getIntroduction(tableData[])
                   // this.introduction=res.introduction
               })
           },
            ScreenText:function () {
                console.log(this.query3.hy)
                this.query3.url='http://127.0.0.1:8000/LOGIN/ScreenQCWYData?hy='+this.query3.hy+'&ed='+this.query3.ed+'&we='+this.query3.we+'&rt='+this.query3.rt+'&yx='+this.query3.yx+'&wt='+this.query3.wt+'&zy='+this.query3.zy+'&page='+this.i
                fetchData(this.query3).then(res=>{
                    // this.options=res
                    this.tableData=res
                    // this.getIntroduction(tableData[])
                    // this.introduction=res.introduction

                })
            }


        }
    }
</script>

<style scoped>
    .font{
        font-size: 60px;
        height: 90%;
    }

</style>