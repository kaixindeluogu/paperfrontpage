<template>
  <div>
    <Headers/>
    <SecondHeader/>
    <br>
    <div class="personal-center">
    <el-container >
          <el-menu
              router
              :default-active="$router.currentRoute.path"
              default-active="2"
              class="el-menu-vertical-demo custom-menu"
              background-color="burlywood">

            <el-menu-item index="/change/personal">
              <i class="el-icon-menu"></i>
              <span slot="title">个人信息</span>
            </el-menu-item>

            <el-menu-item index="/change/password">
              <i class="el-icon-menu"></i>
              <span slot="title">修改密码</span>
            </el-menu-item>


            <el-menu-item index="/change/data">
              <i class="el-icon-menu"></i>
              <span slot="title">修改个人信息</span>
            </el-menu-item>

            <el-menu-item index="/change/favorites">
              <i class="el-icon-menu"></i>
              <span slot="title">我的收藏夹</span>
            </el-menu-item>
          </el-menu>
        <el-main class="main">
          <router-view/>
        </el-main>
      </el-container>

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
  methods: {
    openLogoutConfirm() {
      //todo跳出弹框,并确认是否登出
      this.$confirm('您将退出个人信息登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem("jwt")
        this.$message({
          type: 'success',
          message: '已退出登录!'
        });
        this.$router.replace('/')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消退出登录'
        });
      });

    }
  }
}

</script>

<style>

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
.el-menu.is-active{}
.main {}

</style>

