<template>
  <div class="login-page">
    <div class="login-box">
      <el-form label-width="80px" style="width: 400px;margin: 50px 10px 50px; ">
        <el-form-item class="a" label="邮箱">
          <el-input placeholder="填写正确格式" v-model="user.email"></el-input>
          <button type="button" id="send-code-btn" @click="send()">发送验证码</button>
        </el-form-item>
        <el-form-item class="a" label="验证码">
          <el-input placeholder="填写邮箱验证码" v-model="user.code"></el-input>
        </el-form-item>

        <el-form-item class="a" label="新密码">
          <el-input type="password" placeholder="新密码包含字母和数字,长度在6到16个"
                    v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item class="a" label="输入密码">
          <el-input type="password" placeholder="两次密码保持一致"
                    v-model="user.secondPassword"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="forget()">用户验证</el-button>
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
        password: "", secondPassword: "", email: "", code: ""
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
      this.axios.get("http://localhost:8081/v1/users/send?email=" + this.user.email).then( (response)=> {
        if (response.data.code == 1000) {
          this.$message.success("发送验证码成功");
        } else {
          alert("发送验证码失败");
          return;
        }

      });
      // 将按钮变为不可用状态
      var btn = document.getElementById('send-code-btn');
      btn.disabled = true;

      // 开始倒计时
      var count = 120;
      var timer = setInterval(function () {
        count--;
        btn.innerHTML = count + '秒后重新发送';
        if (count == 0) {
          clearInterval(timer);
          btn.innerHTML = '发送验证码';
          btn.disabled = false;
        }
      }, 1000);


    },
    /*增加一个else判断两次输入的密码是否一致*/
    forget() {
      if (this.user.password == this.user.secondPassword) {
        if (this.user.password.length === 0 || this.user.secondPassword.length === 0
        ) {
          this.$message.error("选项不能为空");
          return;
        }

        this.axios.post("http://localhost:8081/v1/users/forget-email", this.user).then(( (response)=> {
          if (response.data.code == 1000) {
            this.$message.success("修改成功,请注意邮箱查收");
            location.href = "/login";
          }else {
            this.$message.error(response.data.misDescription);
          }

        }));

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
</style>