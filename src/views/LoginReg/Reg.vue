<template>
  <div class="login-page">
    <div class="login-box">
      <el-form label-width="80px" style="width: 400px;margin: 10px 10px 50px; ">
        <el-form-item class="a" label="邮箱">
          <el-input placeholder="填写正确格式" v-model="user.email"></el-input>
          <button type="button" id="send-code-btn" @click="send()">发送验证码</button>
        </el-form-item>
        <el-form-item  class="a" label="验证码">
          <el-input placeholder="填写邮箱验证码" v-model="user.code"></el-input>
        </el-form-item>
        <el-form-item  class="a" label="用户名">
          <el-input placeholder="包含字母和数字,长度在3到16个" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item class="a" label="昵称">
          <el-input placeholder="请输入昵称" v-model="user.nickname"></el-input>
        </el-form-item>
        <el-form-item class="a" label="密码">
          <el-input type="password" placeholder="包含字母和数字,长度在6到16个"
                    v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item class="a" label="密保问题">
          <!--event.target.value给下拉框选项用value复制给变量-->
          <select id="fruit-select" style="width: 320px;height: 40px;font-size: 10px"
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
          <el-button type="primary" @click="reg()">注册</el-button>
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
        username: "", password: "", nickname: "", admin: ""
      }

    }
  },
  methods: {
    send() {
      //^ 表示匹配字符串的开始位置。
      //([a-zA-Z0-9_\-\.]+) 表示匹配一个或多个字母、数字、下划线、短横线或点号。
      //@ 表示匹配一个 @ 符号。
      //([a-zA-Z0-9_\-\.]+) 表示匹配一个或多个字母、数字、下划线、短横线或点号。
      //\. 表示匹配一个点号。
      //([a-zA-Z]{2,5}) 表示匹配两到五个字母。
      //$ 表示匹配字符串的结束位置。
      let email_regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
      //let email_regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/;
      if (!(email_regex.test(this.user.email))) {
        this.$message.error("邮箱格式格式不正确");
        return;
      }
      this.axios.get("http://localhost:8081/v1/users/send?email=" + this.user.email).then((response) =>{
        if (response.data.code == 1000) {
          this.$message.success("发送验证码成功");
        }else {
          alert("发送验证码失败");
          return;
        }

      });
      // 将按钮变为不可用状态
      var btn = document.getElementById('send-code-btn');
      btn.disabled = true;

      // 开始倒计时
      var count = 120;
      var timer = setInterval(function() {
        count--;
        btn.innerHTML = count + '秒后重新发送';
        if (count == 0) {
          clearInterval(timer);
          btn.innerHTML = '发送验证码';
          btn.disabled = false;
        }
      }, 1000);


    },

    reg() {
      if (this.user.nickname.length === 0 || this.user.username.length === 0 ||
          this.user.question.length === 0 || this.user.answer.length === 0 ||
          this.user.password.length === 0) {
        alert("选项不能为空");
        return;

      }
      let regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/;

      if (!regex.test(this.user.username)) {
        this.$message.error("用户名格式不正确");
        return;
      }
      if (!regex.test(this.user.password)) {
        this.$message.error("密码格式不正确");
        return;
      }
      this.axios.post("http://localhost:8081/v1/users/reg", this.user).then(( (response) => {
        if (response.data.code == 1000) {

          this.$message.success("注册成功");
          location.href = "/";
        } else  {
          alert(response.data.misDescription)
        }
      }))


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
</style>