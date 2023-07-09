<template>
  <!--9098-->
  <div>
    <el-container>
      <el-header id="el-header" height="80px">
        <div class="head-div">
          <el-row gutter="30">
            <el-col span="4" style="margin-left: 40px">
              <img src="../assets/WechatIMG21.png" width="150" height="110" @click="home">
            </el-col>
            <el-col span="10">
              <el-menu class="el-menu"
                       mode="horizontal" menu-trigger="click" active-text-color="purple">
                <el-menu-item index="0" style="color: black" @click="home">首页</el-menu-item>
                <!--                分类-->
                <el-submenu index="1" style="color: black">
                  <template slot="title">分类</template>
                  <el-menu-item v-for="item in tableForm"
                                :index="item.id" :value="item.id" @click="sortPage(item.url)"
                                style="background-color: rgba(248,241,241,0.99);color: black;">{{ item.name }}
                  </el-menu-item>
                </el-submenu>

                <el-menu-item index="2" style="color: black" @click="open1">排行榜</el-menu-item>
                <el-menu-item index="3" style="color: black" @click="open2">个人中心</el-menu-item>
                <el-menu-item index="4" style="color: black" @click="open3">关于我们</el-menu-item>
              </el-menu>
            </el-col>
            <el-col span="4">
              <el-input style="margin-top: 40px" placeholder="百日孤独">
                <el-button slot="append" icon="el-icon-search">搜索</el-button>
              </el-input>
            </el-col>
            <el-col span="5">
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

              <div class="login-user" v-else>
                <el-dropdown @command="handleCommand">
                <span class="welcome">欢迎回来，<b>{{ currentUserName }}</b>&nbsp!&nbsp&nbsp&nbsp</span>
                  <template >
                    <el-avatar v-if="currentUserAvatar" size="medium" :src="currentUserAvatar"></el-avatar>

                    <el-avatar v-else src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                  </template>

                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-plus" command="openEditInfoDialog">修改资料</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-plus" command="openEditAvatarDialog">修改头像</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-plus" command="openEditPasswordDialog">修改密码</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-plus" divided command="openLogoutConfirm">退出登录</el-dropdown-item>
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
      tableForm: [
        {id: 1, name: "名著", url: "https://www.baidu.com"},
        {id: 2, name: "小说", url: "https://www.baidu.com"}
      ],
      currentUserName: '',
      currentUserAvatar: '',
    }
  },

  methods: {
    //获取分类数据并实现点击跳转
    sortPage(url) {
        axios.get('http://localhost:8081/v1/adver/' + item.id).then(response => {
          this.tableForm = response.data;
        })
            .catch(error => {
              console.error(error);
            });
      window.location.href = url;
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
              message: '删除成功!'
            });
            this.$router.push('/home')
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
      if (currentPath !== '/Home') {
        this.$router.replace({path: '/Home  '});
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
  },
}
</script>

<style scoped>
/*登陆成功后头像显示设置*/
.login-user {
  float: right;
  margin-top: 40px;
  display: flex;
}

.login-user .welcome {

  line-height: 60px;
  color: black;

}


#el-header {

}

.head-div {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
}

.el-menu {
  margin-top: 20px;
}

</style>