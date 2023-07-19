<template>
  <div v-if="currentPage === 'profile'">
    <!-- 个人信息页面内容 -->
    <div class="background-image">
      <div class="profile-info">
        <el-card>
          <el-row>
            <el-col :span="12">
              <el-form label-width="120px">
                <el-form-item label="用户名">
                  <el-input v-model="userName" disabled></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                  <el-input v-model="nickName" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                  <el-input v-model="email" disabled></el-input>
                </el-form-item>
                <el-form-item label="性别">
                  <el-input v-model="gender" disabled></el-input>
                </el-form-item>
                <el-form-item label="电话号">
                  <el-input v-model="phoneNumber" disabled></el-input>
                </el-form-item>
                <el-form-item label="账户余额">
                  <el-input v-model="account" disabled></el-input>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import Headers from "@/common/Headers.vue";
import SecondHeader from "@/components/SecondHeader.vue";
import Footer from "@/common/Footer.vue";
import axios from "axios";

export default {
  components: {
    Headers,
    SecondHeader,
    Footer,
  },
  data() {
    return {
      pageTitle: '个人信息',
      currentPage: 'profile',
      userName: '',
      nickName: '',
      email: '',
      gender: '',
      phoneNumber: '',
      account: ''

    }
  },
  mounted() {
    // 获取个人信息数据
    this.fetchProfileData();
  },
  methods: {
    async fetchProfileData() {
      try {
        const response =
            await axios
                .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
                .get('http://localhost:8081/v1/personal/center/' + localStorage.getItem('id'), {
                  headers: {'Authorization': localStorage.getItem('jwt')}
                });
        this.userName = response.data.data[0].userName;
        this.nickName = response.data.data[0].nickName;
        this.email = response.data.data[0].email;
        this.gender = response.data.data[0].gender;
        this.phoneNumber = response.data.data[0].phoneNumber;
        this.account = response.data.data[0].account;
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<style scoped>
/*.background-image {*/
/*  background-image: url('@/assets/b361c67ed66e39c350978d7f6165db1.jpg');*/
/*  background-size: cover;*/
/*  background-position: center;*/
/*  height: 90vh;*/
/*  align-items: center;*/
/*  background-color: rgba(255, 255, 255, 0.5);*/
/*}*/

/*.profile-info {*/
/*  margin: 20px;*/
/*  padding: 20px;*/
/*  background-color: #f5f5f5;*/
/*  border: 1px solid #ccc;*/
/*}*/

.background-image {
  background-image: url('@/assets/b361c67ed66e39c350978d7f6165db1.jpg');
  background-size: cover;
  background-position: center;
  height: 90vh;
  background-color: rgba(255, 255, 255, 0.5);
}

.profile-info {
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  margin: 20px;
  padding: 20px;
}


</style>