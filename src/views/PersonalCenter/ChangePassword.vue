<!--修改密码-->
<template>
  <div >
    <div class="background-image">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-row>
          <br>
          <br>
          <el-col :span="12">
            <el-form-item label="原密码">
              <el-input placeholder="请输入原密码" v-model="ruleForm.passwordJ" show-password ></el-input>
            </el-form-item>
            <el-form-item label="新密码">
              <el-input placeholder="请输入新密码" v-model="ruleForm.password" show-password></el-input>
            </el-form-item>
            <el-form-item label="问题">
              <el-select placeholder="请选择密保问题" v-model="ruleForm.question">
                <el-option label="您的身份证号码?" value="您的身份证号码?"></el-option>
                <el-option label="您的父亲的名字?" value="您的父亲的名字?"></el-option>
                <el-option label="您的难忘的事情?" value="您的难忘的事情?"></el-option>
                <!-- 添加更多选项 -->
              </el-select>
            </el-form-item>
            <el-form-item label="答案">
              <el-input placeholder="请输入密保答案" v-model="ruleForm.answer" show-password></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--      <el-button type="primary" plain>主要按钮</el-button>-->
        <div class="parent-container">
          <el-button @click="changePassword()" class="upload-button" type="primary" plain>提交</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        currentPage: 'profile',
        password: '',
        question: '',
        answer: '',
        passwordJ: '',
      },
      // 表单规则
      rules: {}
    };
  },
  methods: {
    // 提交表单
    changePassword() {
      let id = this.ruleForm.id = localStorage.getItem('id');
      let url = "http://localhost:8081/v1/personal/" + id + "/insert/info";
      this.axios
          .post(url, this.ruleForm, {
            headers: {Authorization: localStorage.getItem('jwt')}
          })
          .then(response => {
            let jsonResult = response.data;
            if (response.data.state === 20000) {
              this.$message.success("修改成功!");
              localStorage.removeItem("jwt")
              this.$router.replace({ path: '/' }); // 跳转回首页
            } else {
              this.$message.error(jsonResult);
            }
          });


    }
  },
}
</script>

<style scoped>
.background-image {
  background-image: url('@/assets/bbf75ba7249e0883744a5448fde1d3f.jpg');
  background-size: cover;
  background-position: center;
  height: 90vh;
  align-items: center;
}


.parent-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.upload-button {
  margin-right: 72%;
}

</style>