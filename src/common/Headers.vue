<template>
  <!--9098-->
  <div class="container">
    <el-container>
      <el-header id="el-header" height="80px">
        <div class="head-div">
          <el-row gutter="24">
            <el-col span="4" style="margin-left: 40px">
              <img src="../assets/WechatIMG21.png" width="150" height="110" @click="home">
            </el-col>
            <el-col span="10">
              <el-menu class="el-menu" mode="horizontal" menu-trigger="hover" active-text-color="purple"
                       style="background-color: rgba(255, 255, 255, 0.3);">
                <el-menu-item index="0" style="color: black" @click="home">首页</el-menu-item>
                <!--                分类-->
                <el-submenu index="1" style="color: black;">
                  <template slot="title">分类</template>
                  <!-- @click="sortPage(item.url)" -->
                  <el-menu-item v-for="item in tableForm"
                                :index="item.id" :value="item.id"
                                style=" background-color: #ffffff; color: #333; text-align: center;">
                    {{ item.name }}
                  </el-menu-item>
                </el-submenu>

                <el-menu-item index="2" style="color: black" @click="open1">排行榜</el-menu-item>
                <el-menu-item index="3" style="color: black" @click="open2">个人中心</el-menu-item>
                <el-menu-item index="4" style="color: black" @click="open3">关于我们</el-menu-item>
              </el-menu>
            </el-col>
            <el-col :span="4">
              <el-input style="margin-top: 20px" v-model="wd" @keydown.native.enter="search()" placeholder="请输入搜索的关键字">
                <el-button slot="append" @click="search()" icon="el-icon-search"></el-button>
              </el-input>
            </el-col>
            <el-col span="4">
              <!--              初始页面登录框-->
              <el-popover v-if="userLogin()"
                          placement="top-start"
                          title="欢迎进入书籍的海洋,请登录!"
                          width="200"
                          trigger="hover">
                <div slot="reference">
                  <i class="el-icon-user"
                     style="font-size: 25px;position: relative;top: 45px"></i>
                </div>
                <el-button type="info" @click="register">注册</el-button>
                <el-button style="background-color: mediumpurple" @click="login">登录</el-button>
              </el-popover>
              <!--              登陆成功切换页面-->

              <div class="login-user1" v-else>

                <span class="welcome"><b>{{ currentUserName }}</b>&nbsp&nbsp&nbsp&nbsp&nbsp</span>
                <el-dropdown @command="handleCommand">
                  <template>
                    <el-avatar v-if="currentUserAvatar" size="medium" :src="currentUserAvatar"></el-avatar>

                    <el-avatar v-else
                               src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                               style="width: 50px;height: 50px;"></el-avatar>
                  </template>
                  <el-dropdown-menu slot="dropdown">

                    <el-dropdown-item icon="el-icon-user" command="openPersonalDialog" style="text-align: center">
                      个人中心
                    </el-dropdown-item>
                    <div style="height: 1px;background-color: #999999;margin: 1px 10px; /* 调整横线的位置 */"></div>
                    <el-dropdown-item icon="el-icon-plus" command="openEditInfoDialog">修改资料</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-plus" command="openEditAvatarDialog">修改头像</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-plus" command="openEditPasswordDialog">修改密码</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-close" divided command="openLogoutConfirm">退出登录
                    </el-dropdown-item>
                  </el-dropdown-menu>

                </el-dropdown>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-header>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Headers",
  data() {
    return {
      book:[],
      wd:'',
      tableForm: [
        // {id: 1, name: "名著", url: "https://www.baidu.com"},
        // {id: 2, name: "小说", url: "https://www.baidu.com"}
      ],
      currentUserName: '',
      currentUserAvatar: '',
    }
  },

  methods: {
    search() {
      if (this.wd.trim() == "") {
        this.$message.error("请输入搜索的内容!");
        return;
      }
      // 构建搜索结果页面的路径
      const searchResultPath = '/SearchResult/' + this.wd;

      if (this.$route.path === searchResultPath) {
        // 当前路由路径与搜索结果页面的路径相同，无需重新导航
        return;
      }

      // 使用 $router.replace() 方法进行导航，并传递搜索内容作为参数
      this.$router.replace(searchResultPath);
    },

    //获取分类数据并实现点击跳转
    sortPage() {
      console.log(+localStorage.getItem('jwt'));
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .get('http://localhost:8081/v1/adver/categoryList').then(response => {
        this.tableForm = response.data.data;
      })
          .catch(error => {
            console.error(error);
          });
    },
    handleCommand(command) {
      if (command == 'openEditInfoDialog') {
        this.openEditInfoDialog();
      } else if (command == 'openEditAvatarDialog') {
        this.openEditAvatarDialog();
      } else if (command == 'openEditPasswordDialog') {
        this.openEditPasswordDialog();
      } else if (command == 'openLogoutConfirm') {
        this.openLogoutConfirm();
      }
    },
    openEditInfoDialog() {
      console.log('准备弹出修改当前用户资料的对话框');
    },
    openEditAvatarDialog() {
      console.log('准备弹出修改当前用户头像的对话框');
    },
    openEditPasswordDialog() {
      console.log('准备弹出修改当前用户密码的对话框');
    },
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
        location.reload();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消退出登录'
        });
      });

    },
    /**
     * 登录判断
     */
    userLogin() {
      if (localStorage.getItem("jwt") != null) {
        console.log("jwt")
        return false;
      }
      return true;
    },
    open1() {
      this.$message({
        message: '即将进入 排行榜 页面',
        type: 'success'
      });
    },
    open2() {
      this.$message({
        message: '即将进入 个人中心 页面',
        type: 'success'
      });
    },
    open3() {
      this.$message({
        message: '即将进入 关于我们 页面',
        type: 'success'
      });
    },
    login() {
      const currentPath = this.$router.currentRoute.path;
      if (currentPath !== '/login') {
        this.$router.replace({path: '/login'});
      }
    },
    register() {
      const currentPath = this.$router.currentRoute.path;
      if (currentPath !== '/reg') {
        this.$router.replace({path: '/reg'});
      }
    },
    home() {
      const currentPath = this.$router.currentRoute.path;
      if (currentPath !== '/') {
        this.$router.replace({path: '/'});
      }
    },
    loadCurrentUserInfo() {
      this.currentUserName = localStorage.getItem('username');/*'currentUserName'*/
      this.currentUserAvatar = localStorage.getItem('currentUserAvatar');
      //  补充头像
    },
  },
  mounted() {
    this.loadCurrentUserInfo();
    this.userLogin();
    this.sortPage();

  },
}
</script>

<style scoped>
.container {
  width: 1500px;
  margin: 0 auto;
}
/*登陆成功后头像显示设置*/
.login-user1 {
  float: right;
  margin-top: 30px;
  display: flex;
}

.login-user1 .welcome {
  font-size: 19px;
  line-height: 60px;
  color: black;

}

.head-div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-image: url("../assets/img01.png"); /* 替换为你的背景图片路径 */
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
}

.el-menu {
  margin-top: 20px;
}

</style>