<template>
<!--  登陆页面-->
  <div class="login-page">
    <div class="login-box">
      <el-form ref="user" :model="user" label-width="80px" style="width: 400px;margin: 50px 10px 50px; ">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" >
          <el-input type="password" v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">用户登录</el-button>
          <a href="/forgetPassword" class="forget-password">忘记密码</a>
          <a href="/reg" class="register">注册账号</a>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>

export default {

  data() {
    return {
      user: {
        username: "", password: "", nickname: "", question: "", answer: "",email:"", code: "",
      }

    }
  },
  methods: {
    /**
     * 登录请求后端方法
     */
    login() {
      if (this.user.username.length == 0 || this.user.password.length == 0) {
        this.$message.error("选项不能为空");
        return;
      }

      this.axios.post("http://localhost:8081/v1/users/login", this.user).then( (response) => {
        if (response.data.code == 1000) {
          this.$message.success("登录成功");
          //获取登录信息缓存到浏览器中
          let loginResult = response.data.data;
          localStorage.setItem("id", loginResult.id);
          localStorage.setItem("username", loginResult.username);
          localStorage.setItem("jwt", loginResult.token);
          localStorage.setItem("authority",loginResult.admin[0].authority);
          console.log(loginResult.admin[0].authority);
          console.log(localStorage.getItem("jwt"));
          console.log(localStorage.getItem("authority"))
          this.$router.push('/')




          /*控制不同权限用户登录成功后跳转的页面*/
          //localStorage.user = JSON.stringify(response.data.data);
          /*第一次拆分*/
          //let storage = localStorage.user.split('[{"authority":"');

          /*for (let i = 0; i < storage.length; i++) {
            console.log(storage[i])
            console.log(storage[1].split('"}]'))
            /!*第二次拆分过去第一个数组元素值*!/
            if (storage[1].split('"}]')[0] === 'ROLE_admin') {
              console.log(1)
              location.href = "http://localhost:9090/home";
              break;
            }
            if (storage[1].split('"}]')[0] === 'ROLE_bookadmin') {
              console.log(2)
              location.href = "http://localhost:9090/bookadmin";
              break;
            }
            if (storage[1].split('"}]')[0] === 'user') {
              console.log(3)
              location.href = "/";
              break;
            }
          }*/

        } else {
          this.$message.error(response.data.misDescription);
        }
      });
    }
  }
}

</script>


<style>
.login-page {
  background-image: url('@/assets/9476.gif_wh300.gif');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  width: 400px;
  background-color: rgba(255, 255, 255, 0.24);
  border-radius: 5px;
  padding: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.logo {
  text-align: center;
  margin-bottom: 30px;
}

.forget-password,
.register {
  margin-left: 20px;
}

.el-form-item__label{
  color: skyblue;
}

.login-box input[type="text"],
.login-box input[type="password"] {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
  margin-bottom: 10px;
}

/* 修改忘记密码和注册链接的样式 */
.login-box .forget-password,
.login-box .register {
  color: #fff;
  text-decoration: none;
}
</style>