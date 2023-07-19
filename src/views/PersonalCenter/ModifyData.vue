<!--修改资料-->
<template>
  <div>
    <!-- 修改资料页面内容 -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-row>
        <br>
        <br>
        <el-col :span="12">
          <el-form-item label="编辑昵称">
            <el-input style="width: 100%" placeholder="请输入新昵称" v-model="ruleForm.nickName"></el-input>
          </el-form-item>
          <el-form-item label="编辑手机号">
            <el-input style="width: 100%" placeholder="请输入新手机号" v-model="ruleForm.phoneNumber"></el-input>
          </el-form-item>
          <el-form-item label="修改性别">
            <el-select style="width: 100%" placeholder="请选择性别" v-model="ruleForm.gender">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button @click="changePassword()" class="upload-button" size="small" type="primary">提交</el-button>
    </el-form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      ruleForm: {
        nickName: '',
        phoneNumber: '',
        gender: ''
      },
      // 表单规则
      rules: {}
    };
  },
  methods: {
    // 提交表单
    changePassword() {
      let id = this.ruleForm.id = localStorage.getItem('id');
      let url = "http://localhost:8081/v1/personal/" + id + "/update/info";
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .post(url, this.ruleForm, {
            headers: {Authorization: localStorage.getItem('jwt')}
          })
          .then(response => {
            let jsonResult = response.data;
            if (response.data.state === 20000) {
              this.$message.success("修改成功!");
              location.reload();
            } else {
              this.$message.error(jsonResult);
            }
          });
    }
  },
}
</script>

<style scoped>

</style>