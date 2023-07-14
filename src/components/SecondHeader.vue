<template>
  <div :class="{ 'fixed-header': isFixed }" v-if="showheader">
    <div style="width: 100%;height: 45px;position: absolute;padding-top: 1px;backdrop-filter: blur(90px); line-height: 40px">
      <el-row :gutter="20">
        <el-col :span="8" :offset="2" style="line-height: 40px">
          <el-list :direction="'horizontal'" >
            <el-list-item class="custom-list-item">
              <a class="el-icon-s-custom" >纸片阅读</a>
            </el-list-item>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-list-item class="custom-list-item"><a href="/">首页</a></el-list-item>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-list-item class="custom-list-item"><a href="#" @click="open1">排行榜</a></el-list-item>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-list-item class="custom-list-item"><a href="#" @click="open2">个人中心</a></el-list-item>
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            <el-list-item class="custom-list-item"><a href="#" @click="open3">关于我们</a></el-list-item>
            &nbsp;&nbsp;&nbsp;&nbsp;
          </el-list>
        </el-col>
        <el-col :span="6">
          <el-input style="height: 20px;border: none" placeholder="请输入搜索的关键字">
            <el-button style="border: none" slot="append" icon="el-icon-search">
            </el-button>
          </el-input>
        </el-col>
        <el-col :span="6" :offset="2">
          <div v-if="userLogin()">
            <!--              初始页面登录框-->
            <el-list-item class="custom-list-item"><a href="#" @click="login">登录</a></el-list-item>
            <el-divider direction="vertical"></el-divider>
            <el-list-item class="custom-list-item"><a href="#" @click="register">注册</a></el-list-item>
          </div>
          <div class="login-user" v-else>

            <span class="welcome"><b>{{ currentUserName }}</b>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>
            <el-dropdown @command="handleCommand">
              <template>
                <el-avatar v-if="currentUserAvatar" size="medium" :src="currentUserAvatar"></el-avatar>

                <el-avatar v-else
                           src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                style="width: 100%;height: 30px"></el-avatar>
              </template>
              <el-dropdown-menu slot="dropdown">

                <el-dropdown-item icon="el-icon-user" command="openPersonalDialog" style="text-align: center">个人中心</el-dropdown-item>
                <div style="height: 1px;background-color: #999999;margin: 1px 10px; /* 调整横线的位置 */"></div>
                <el-dropdown-item icon="el-icon-plus" command="openEditInfoDialog">修改资料</el-dropdown-item>
                <el-dropdown-item icon="el-icon-plus" command="openEditAvatarDialog">修改头像</el-dropdown-item>
                <el-dropdown-item icon="el-icon-plus" command="openEditPasswordDialog">修改密码</el-dropdown-item>
                <el-dropdown-item icon="el-icon-close" divided command="openLogoutConfirm">退出登录</el-dropdown-item>
              </el-dropdown-menu>

            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showheader:false,
      isFixed: false,
      tableForm: [
        // {id: 1, name: "名著", url: "https://www.baidu.com"},
        // {id: 2, name: "小说", url: "https://www.baidu.com"}
      ],
      currentUserName: '',
      currentUserAvatar: '',
    }
  },
  mounted() {
    this.loadCurrentUserInfo();
    this.userLogin();
    this.sortPage();
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      // 获取页面滚动的距离
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      // 判断是否需要悬浮头部组件
      if (scrollTop > 100) {
        this.isFixed = true;
        this.showheader=true;
      } else {
        this.showheader=false;
        this.isFixed = false;
      }
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
      if (currentPath !== '/') {
        this.$router.replace({path: '/'});
      }
    },
    loadCurrentUserInfo() {
      this.currentUserName = localStorage.getItem('username');/*'currentUserName'*/
      this.currentUserAvatar = localStorage.getItem('currentUserAvatar');
      //  补充头像
    }
  }
};
</script>
<style>
.login-user {
  float: right;
  margin-top: 5px;
  margin-right: 40px;
  display: flex;
}
.custom-list-item a {

  font-size: 16px;
  color: black;
}

.fixed-header {
  background-color: rgba(255,255,255,0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  transition: top 0.3s ease-in-out;
  z-index: 999;
}

.fixed-header.hidden {
  top: -100%;
  transition: top 0.3s ease-in-out;
}

</style>