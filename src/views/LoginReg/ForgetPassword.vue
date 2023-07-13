<template>
<!--  密保问题找回密码页面-->
  <div class="login-page">
    <div class="login-box">
      <el-form label-width="80px" style="width: 400px;margin: 50px 10px 50px; ">
        <el-form-item class="a" label="用户名">
          <el-input placeholder="请输入用户名" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item class="a" label="新密码">
          <el-input type="password" placeholder="新密码包含字母和数字,长度在6到16个"
                    v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item class="a" label="输入密码">
          <el-input type="password" placeholder="两次密码保持一致"
                    v-model="user.secondPassword"></el-input>
        </el-form-item>
        <el-form-item class="a" label="密保问题">
          <!--event.target.value给下拉框选项用value复制给变量-->
          <select id="fruit-select" style="width: 320px;height: 40px;font-size: 10px;background-color: skyblue"
                  @change="user.question = $event.target.value">
            <!--第一个value默认不进行赋值-->
            <option value="" disabled selected hidden>请选择一个问题</option>
            <option value="您的父亲的名字?">您的父亲的名字?</option>
            <option value="您的身份证号码?">您的身份证号码?</option>
            <option value="您最难忘的事情?">您最难忘的事情?</option>
          </select>
        </el-form-item>
        <el-form-item class="a" label="密保答案">
          <el-input placeholder="请输入您的答案" v-model="user.answer"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="forget()">用户验证</el-button>
          <a href="/forgetPasswordEmail" class="forget-Password-Email">邮箱验证</a>
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
        username: "", question: "", answer: "", password: "", secondPassword: ""
      }

    }
  },
  methods: {
    /**
     * 密保问题找回密码方法
     */
    forget() {
      if (this.user.password == this.user.secondPassword) {
        if (this.user.username.length === 0 ||
            this.user.question.length === 0 || this.user.answer.length === 0
        ) {
          this.$message.error("选项不能为空");
          return;
        }
        //邮箱正则
        let regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/;
        if (!regex.test(this.user.password)) {
          this.$message.error("密码格式不正确");
          return;
        }
        this.axios.post("http://localhost:8081/v1/users/forget", this.user).then(((response)=> {

          switch (response.data.code) {
            case 1000:
              alert("验证成功,请登录!")
              /*跳转到登录页*/
              location.href = "/login";
              break;
            case 1004:
              this.$message.error("验证失败,还有2次机会!")
              break;
            case 1005:
              this.$message.error("验证失败,还有1次机会!")
              break;
            case 1006:
              this.$message.error("验证失败,今日已无机会,明日再来!")
              break;
          }
        }));

      } else {
        this.$message.error("两次密码不一致请重新填写!");
        return;
      }


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

.el-form-item__label{
  color: skyblue;
}

/* 修改忘记密码和注册链接的样式 */

.login-box .forget-Password-Email {
  color: #fff;
  text-decoration: none;
}
</style>