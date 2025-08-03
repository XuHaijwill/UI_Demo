<template>
    <div class="common-layout container">
      <el-container class="container">
        <el-header class="header">
            <div class="logo">
                <img src="../assets/logo1.png" alt="">
                <span>电商后台管理系统</span>
            </div>
            <div class="user">
                <el-button @click="logout" type="success" plain>退出</el-button>
                <!-- <el-button @click="test">测试</el-button> -->
            </div>
        </el-header>
        <el-container>
          <el-aside class="aside">
            <el-menu 
                active-text-color="#ffd04b" 
                background-color="#001529" 
                class="el-menu-vertical-demo" 
                default-active="2"
                text-color="#fff"
                unique-opened
                router
                >
                <el-sub-menu :index="index+' '" v-for="(item,index) in menuList.menus">
                    <template #title>
                        <el-icon>
                            <component :is="menuList.icons[item.id]"></component>
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item :index="childItem.path" v-for="childItem in item.children">
                        {{ childItem.name }}
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
          </el-aside>
          <el-main>
            <router-view/>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router';
    import { onMounted,reactive } from 'vue';
    import api from '@/api/index.js'        // 导入api接口
    
    const menuList = reactive({
        menus:[],
        icons:{
            '1':'User',
            '2':'Tools',
            '3':'Goods',
            '4':'Shop',
            '5':'PieChart'
        }
    })

    const router = useRouter()

    //当Dom元素加载完，调用
    onMounted(() => {
        get_menu()
    })
    // 退出登录
    const logout = () => {
        // 退出登录，从sessionStorage中移除token
        sessionStorage.removeItem('token')
        // 跳转到登录页面
        router.push('/login')
    }
    // 获取菜单
    const get_menu = () => {
        api.get_menu().then(res => {
            menuList.menus=res.data.data
        })
    }


</script>

<style scoped>
    .header {
        background-color: #fff;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        font-size: 20px;
        color: #999;
        height: 50px;
        width: 100%;
    }
    .logo {
        float: left;
        height: 50px;
        align-items: center;
        display: flex;
        justify-content: center;
    }
    .logo img {
        width: 50px;
        height: 30px;
        margin-right: 10px;
    }
    .user {
        float: right;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
    }
    .aside{
        width: 200px;
        background-color: #001529;
    }
    .container{
        height: 100%;
    }
</style>
