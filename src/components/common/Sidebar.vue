<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#10416c"
            text-color="#fff"
            active-text-color="red"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '系统首页'
                },
                {
                    icon: 'el-icon-lx-addressbook',
                    index: '1',
                    title: '工作任务',
                    subs: [
                        {
                            index: 'form0',
                            title: '任务总览'
                        },
                        {
                            index: 'form1',
                            title: '我发布的'
                        },
                        {
                            index: 'form2',
                            title: '我验收的'
                        },
                        {
                            index: 'form3',
                            title: '我执行的'
                        },
                        {
                            index: 'form4',
                            title: '我的周期'
                        }                      
                    ]
                 },  
                {
                    icon: 'el-icon-lx-addressbook',
                    index: '1',
                    title: '我的项目',
                    subs: [
                        {
                            index: 'form0',
                            title: '我参与的'
                        },
                        {
                            index: 'form1',
                            title: '我发布的'
                        },             
                    ]
                 },  
                {
                    icon: 'el-icon-lx-addressbook',
                    index: '1',
                    title: '我的积分',
                    subs: [                                
                            {
                                icon: 'el-icon-lx-edit',
                                index: 'importproject',
                                title: '申请积分'
                            },               
                            {
                                icon: 'el-icon-lx-group',
                                index: 'projectreviewlist',
                                title: '积分审核'
                            },               
                            {
                                icon: 'el-icon-lx-redpacket',
                                index: 'applyfund',
                                title: '资源申请'
                            }
                    ]
                },              
                {
                    icon: 'el-icon-lx-addressbook',
                    index: '1',
                    title: '项目管理',
                    subs: [                                
                            {
                                icon: 'el-icon-lx-edit',
                                index: 'importproject',
                                title: '导入项目'
                            },               
                            {
                                icon: 'el-icon-lx-group',
                                index: 'projectreviewlist',
                                title: '项目评审'
                            },               
                            {
                                icon: 'el-icon-lx-redpacket',
                                index: 'applyfund',
                                title: '资源申请'
                            }
                    ]
                },              
                 {
                    icon: 'el-icon-lx-addressbook',
                    index: '1',
                    title: '过程管理',
                    subs: [
                        {
                            index: 'form0',
                            title: '合同管理'
                        },
                        {
                            index: 'form1',
                            title: '上线确认书'
                        },
                        {
                            index: 'form2',
                            title: '验收报告'
                        },
                        {
                            index: 'form3',
                            title: '定期项目更新'
                        },
                        {
                            index: 'form4',
                            title: '人力变更申请'
                        },
                        {
                            index: 'form5',
                            title: '进度查询'
                        }                        
                    ]
                 },                            
                 {
                    icon: 'el-icon-lx-service',
                    index: '2',
                    title: '售后服务',
                    subs: [
                        {
                            index: 'form6',
                            title: '收取费用提醒'
                        },                        
                        {
                            index: 'form7',
                            title: '维护费更新'
                        },
                         {
                            index: 'form8',
                            title: '服务记录'
                        },
                         {
                            index: 'form9',
                            title: '投诉管理'
                        },                         {
                            index: 'form10',
                            title: '维护报告'
                        },                                              
                    ]
                 },                               
                {
                    icon: 'el-icon-lx-calendar',
                    index: '3',
                    title: '业务分析',
                    subs: [
                        {
                            index: 'form',
                            title: '基本表单'
                        },
                        {
                            index: '3-2',
                            title: '三级菜单',
                            subs: [
                                {
                                    index: 'editor',
                                    title: '富文本编辑器'
                                },
                                {
                                    index: 'markdown',
                                    title: 'markdown编辑器'
                                }
                            ]
                        },
                        {
                            index: 'upload',
                            title: '文件上传'
                        },
                        {
                            icon: 'el-icon-lx-cascades',
                            index: 'table',
                            title: '基础表格'
                        },
                        {
                            icon: 'el-icon-lx-copy',
                            index: 'tabs',
                            title: 'tab选项卡'
                        },
                        {
                            icon: 'el-icon-lx-emoji',
                            index: 'icon',
                            title: '自定义图标'
                        },
                        {
                            icon: 'el-icon-pie-chart',
                            index: 'charts',
                            title: 'schart图表'
                        },
                        {
                            icon: 'el-icon-rank',
                            index: '6',
                            title: '拖拽组件',
                            subs: [
                                {
                                    index: 'drag',
                                    title: '拖拽列表'
                                },
                                {
                                    index: 'dialog',
                                    title: '拖拽弹框'
                                }
                            ]
                        },
                        {
                            icon: 'el-icon-lx-global',
                            index: 'i18n',
                            title: '国际化功能'
                        },
                        {
                            icon: 'el-icon-lx-warn',
                            index: '7',
                            title: '错误处理',
                            subs: [
                                {
                                    index: 'permission',
                                    title: '权限测试'
                                },
                                {
                                    index: '404',
                                    title: '404页面'
                                }
                            ]
                        }
                    ]
                },
                
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
.sidebar-el-menu.is-active {
          color: rgb(198, 30, 30);
          background-color: #142536;
        }
</style>
