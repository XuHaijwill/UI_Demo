<template>
    <!--要显示主体内容-->
    <div class="main">
        <div class="login">
            <div class="logo">
                <img src="../assets/logo1.png" alt="">
            </div>
            <el-form :model="user" class="user_form" :rules="userRules" ref="userFormRef">
                <el-form-item prop="name">
                    <el-input v-model="user.name" placeholder="用户名" :prefix-icon="User" />
                </el-form-item>
                <el-form-item prop="pwd">
                    <el-input v-model="user.pwd" placeholder="密码" :prefix-icon="Lock" show-password />
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="submitForm(userFormRef)">登录</el-button>
                    <el-button type="success" @click="resetForm(userFormRef)">重置密码</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { Lock, User } from '@element-plus/icons-vue'
import api from '@/api/index.js'        // 导入api接口
import { useRouter } from 'vue-router'  // 导入路由对象

// 定义表单数据
const user = reactive({
    name: 'baizhan',
    pwd: '123456'
})
// 定义表单规则
const userRules = reactive({
    name: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
        { min: 3, max: 10, message: '长度在3到10个字符', trigger: 'blur' }
    ],
    pwd: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
    ]
})

// 创建路由对象
const router = useRouter()

// 定义表单ref
const userFormRef = ref(null)
// 定义重置表单的方法
const resetForm = (formRef) => {
    formRef.resetFields()
}
// 定义登录功能
const submitForm = (formRef) => {
    formRef.validate((valid) => {
        if (valid) {
            console.log('验证通过，可以提交')
            api.login(user).then(res => {
                //根据响应的结果进行处理
                if (res.data.status == 200){
                    ElMessage({
                        message: res.data.msg,
                        type: 'success',
                    })
                    // 记录登录的token
                    sessionStorage.setItem('token', res.data.data.token)
                    // 登录成功后，跳转到主页
                    router.push('/')
                }else{
                    ElMessage.warning(res.data.msg)
                }
            })
        } else {
            console.log('验证失败')
            return false
        }
    })
}

</script>

<style scoped>
.main {
    width: 100%;
    height: 100%;
    background-color: rgb(233, 188, 8);
    display: flex;
    justify-content: center;
    align-items: center;
}

.login {
    width: 450px;
    height: 300px;
    background-color: white;
    border-radius: 5px;
}

.logo {
    width: 200px;
    border: 1px solid #eee;
    margin: 0 auto;
    margin-top: -65px;
    padding: 5px;
    border-radius: 5px;
    box-shadow: 0 0 10px #ddd;
}

img {
    width: 100%;
    height: 100%;
}

.user_form {
    padding: 50px;
}

.btns {
    display: flex;
    justify-content: space-between;
}

.btns button {
    flex: 1;
}
</style>