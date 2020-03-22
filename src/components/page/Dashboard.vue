<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img src="../../assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{nickname}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        上次登录时间：
                        <span>{{lastlogin}}</span>
                    </div>
                    <div class="user-info-list">
                        上次登录地点：
                        <span>{{lastip}}</span>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height:252px;">
                    <div slot="header" class="clearfix">
                        <span>项目详情（一年内）</span>
                    </div>已完成项目
                    <el-progress :percentage="50" color="#42b983"></el-progress>待立项项目
                    <el-progress :percentage="9.5" color="#f1e05a"></el-progress>交付中项目
                    <el-progress :percentage="40" color="#42b913"></el-progress>异常中项目
                    <el-progress :percentage="0.5" color="#f56c6c"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-calendar grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">3200万</div>
                                    <div>执行中项目总额</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">89</div>
                                    <div>项目经理</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>                    
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-notice grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">15</div>
                                    <div>需收取维护费</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">375</div>
                                    <div>立项完成</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                   
                </el-row>
                <el-card shadow="hover" style="height:403px;">
                    <div slot="header" class="clearfix">
                        <span>待办事项</span>
                        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
                    </div>
                    <el-table :show-header="false" :data="todoList" style="width:100%;">
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div
                                    class="todo-item"
                                    :class="{'todo-item-del': scope.row.status}"
                                >{{scope.row.title}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template>
                                <i class="el-icon-edit"></i>
                                <i class="el-icon-delete"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
export default {
    name: 'dashboard',
    data() {
        return {
            name: localStorage.getItem('ms_username'),
            lastlogin:localStorage.getItem('ms_lastlogin'),
            todoList: [
                {
                    title: '今天项目B201912310001预约您进行立项评审',
                    status: false
                },
                {
                    title: '今天项目B201911210002预约您进行需求变更评审',
                    status: false
                },
                {
                    title: '今天项目A201911210005预约您进行研发立项评审',
                    status: false
                },
                {
                    title: '今天项目B201909300001预约您进行结项项评审',
                    status: false
                },
                {
                    title: '今天需提醒市场销售部同事项目B201912310001维护到期',
                    status: true
                },
                {
                    title: '20200101需提醒数据应用产品线负责人有8个项目需关注',
                    status: true
                }
            ],
            data: [
                {
                    name: '2018/09/04',
                    value: 1083
                },
                {
                    name: '2018/09/05',
                    value: 941
                },
                {
                    name: '2018/09/06',
                    value: 1139
                },
                {
                    name: '2018/09/07',
                    value: 816
                },
                {
                    name: '2018/09/08',
                    value: 327
                },
                {
                    name: '2018/09/09',
                    value: 228
                },
                {
                    name: '2018/09/10',
                    value: 1065
                }
            ],
            options: {
                type: 'bar',
                title: {
                    text: '最近半年各产品线项目立项图'
                },
                xRorate: 25,
                labels: ['8月', '9月', '10月', '11月', '12月'],
                datasets: [
                    
                    {
                        label: '数据应用',
                        data: [0, 0, 20, 135, 110]
                    },
                    {
                        label: '金融监管',
                        data: [0, 0, 5, 0, 0]
                    },
                    {
                        label: '海外业务',
                        data: [0, 0, 0, 2, 0]
                    },
                    {
                        label: '综合金融',
                        data: [0, 2, 0, 5, 0]
                    }
                ]
            },
            options2: {
                type: 'line',
                title: {
                    text: '最近几个月各品类销售金额趋势图'
                },
                labels: ['8月', '9月', '10月', '11月', '12月'],
                datasets: [
                    {
                        label: '金融监管',
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: '海外业务',
                        data: [0, 0, 0, 720, 238]
                    },
                    {
                        label: '综合金融',
                        data: [100, 0, 20, 0, 0]
                    },
                    {
                        label: '数据应用',
                        data: [174, 118, 200, 235, 190]
                    }
                ]
            }
        };
    },
    components: {
        Schart
    },

    computed: {
        nickname() {
            let nickname = localStorage.getItem('ms_nickname');
            return nickname ? nickname : this.name;
        },
        lastip() {
            let lastip = localStorage.getItem('ms_lastip');
            return lastip;
        },
        lastlgoin() {
            let lastlgoin = localStorage.getItem('ms_lastlogin');
            return lastlogin?'暂无':'暂无';
        },
              
        role() {
            return this.nickname === '项目主管' ? '超级管理员' : '普通用户';
        }
    },
    // created() {
    //     this.handleListener();
    //     this.changeDate();
    // },
    // activated() {
    //     this.handleListener();
    // },
    // deactivated() {
    //     window.removeEventListener('resize', this.renderChart);
    //     bus.$off('collapse', this.handleBus);
    // },
    methods: {
        changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            });
        }
        // handleListener() {
        //     bus.$on('collapse', this.handleBus);
        //     // 调用renderChart方法对图表进行重新渲染
        //     window.addEventListener('resize', this.renderChart);
        // },
        // handleBus(msg) {
        //     setTimeout(() => {
        //         this.renderChart();
        //     }, 200);
        // },
        // renderChart() {
        //     this.$refs.bar.renderChart();
        //     this.$refs.line.renderChart();
        // }
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(20, 54, 86);
}

.grid-con-1 .grid-num {
    color: rgb(20, 54, 86);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(20, 54, 86);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
