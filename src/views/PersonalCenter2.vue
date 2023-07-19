<!--个人中心-->
<template>
  <div>
    <Headers/>
    <SecondHeader/>
    <br>
    <div class="personal-center">

      <el-menu
          router
          :default-active="$router.currentRoute.path"
          default-active="2"
          class="el-menu-vertical-demo custom-menu"
          background-color="burlywood">

        <el-menu-item index="/personal/personalInformation">
          <i class="el-icon-menu"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>

        <el-menu-item index="/personal/modifyData">
          <i class="el-icon-setting"></i>
          <span slot="title">编辑资料</span>
        </el-menu-item>

        <el-menu-item index="/personal/changePassword">
          <i class="el-icon-setting"></i>
          <span slot="title">修改密码</span>
        </el-menu-item>

        <el-menu-item index="/personal/favorites">
          <i class="el-icon-star-on"></i>
          <span slot="title">我的收藏夹</span>
        </el-menu-item>
      </el-menu>
      <el-main class="main">
      <router-view/>
    </el-main>
    </div>

    <Footer/>
  </div>
</template>

<script>
import Footer from "@/common/Footer";
import SecondHeader from "@/components/SecondHeader.vue";
import Headers from "@/common/Headers";
export default {
  components: {Headers, SecondHeader, Footer},
  name: "PersonalCenter2"
}
</script>

<style scoped>
.personal-center {
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  height: 100vh;
  background-color: bisque;

}
.custom-menu {
  width: 300px; /* 调整宽度的属性 */
}
.main {
}

</style>


