<template>
  <!--9098-->
  <div>
    <el-container>
      <el-header id="el-header" height="80px">
        <div class="head-div">
          <el-row gutter="20">
            <el-col span="5" style="margin-left: 40px">
              <img src="../assets/WechatIMG21.png" width="150" height="110" @click="home">
            </el-col>
            <el-col span="10">
              <el-menu class="el-menu"
                       mode="horizontal" menu-trigger="click" active-text-color="purple">
                <el-menu-item index="0" style="color: black" @click="home">首页</el-menu-item>
                <el-submenu index="1" style="color: black">
                  <template slot="title">分类</template>
                  <el-menu-item index="1-1" v-for="item in tableForm">{{ item }}</el-menu-item>
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
            <el-col span="3">
              <el-popover
                  placement="top-start"
                  title="欢迎进入书籍的海洋,请登录!"
                  width="200"
                  trigger="hover">
                <div slot="reference">
                  <i class="el-icon-user"
                     style="font-size: 30px;position: relative;top: 45px"></i>
                </div>
                <el-button type="info" @click="register">注册</el-button>
                <el-button style="background-color: mediumpurple" @click="login">登录</el-button>
              </el-popover>
            </el-col>
          </el-row>
        </div>
      </el-header>
      <el-main style="font-size: 10px">


        主体部分
      </el-main>
      <el-footer height="200px" style="background-color: #f0f0f0; " class="footer">
        <el-row gutter="20" type="flex" justify="start" class="left-section"
                style="height: 100%">
          <el-col :span="4">
            <img src="../assets/WechatIMG21.png" height="170px" alt="Logo">
          </el-col>
          <!--        </el-row>
                  <el-row gutter="20px" type="flex" justify="center" class="middle-section">-->
          <el-col :span="10">
            <div style="position: relative;margin-left: 100px;margin-top: 50px;text-align: center;
               height: 100%;width: 100%">

              <el-row>
                <i> 友情链接:</i>
                <el-link v-for="keyword in keywords" :key="keyword" :href="getKeywordLink(keyword)">
                  {{ keyword }}||
                </el-link>
              </el-row>
            </div>
          </el-col>
          <!--          right-->
          <el-col :span="10" style="padding-left: 100px;padding-top: 40px">
            <table></table>
            <!--            <img src="../assets/logo.png" height="10px">
                        <el-row>
                          <el-link v-for="item in adver" :href="getAdver(item)">
                            {{ item }}
                          </el-link>
                        </el-row>-->
          </el-col>
        </el-row>

      </el-footer>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Headers",
  data() {
    return {

      book: [],

      adver: {},

      tableForm: [1, 2, 3, 4, 5],
      keywords: ['七猫', '起点', '中国国家图书馆', '中国文化传媒网', '中国图书馆学会', '国家图书馆出版社', '中国古籍保护协会'], // 关键词数组

    }
  },
  methods: {
    open1() {
      this.$message({
        message: '即将进入 排行榜 页面',
        type: 'success'
      });
    }, open2() {
      this.$message({
        message: '即将进入 个人中心 页面',
        type: 'success'
      });
    }, open3() {
      this.$message({
        message: '即将进入 关于我们 页面',
        type: 'success'
      });
    },
    getAdver(item) {
      let url = 'http://localhost:8081/v1/adver' + item.id;
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('localJwt')}})
          .get(url).then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.adver.name = jsonResult.data.data;
        } else {
          let title = '操作失败';
          this.$alert(jsonResult.message, title, {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
        }
      });
    },
    getKeywordLink(keyword) {
      if (keyword == '七猫') {
        return 'https://qimao.com';
      } else if (keyword == '起点') {
        return 'https://qidian.com'
      } else if (keyword == '中国国家图书馆') {
        return 'http://www.nlc.cn/web/index.shtml'
      } else if (keyword == '中国文化传媒网') {
        return 'http://www.ccdy.cn/'
      } else if (keyword == '中国图书馆学会') {
        return 'http://www.lsc.org.cn/cns/index.html'
      } else if (keyword == '国家图书馆出版社') {
        return 'http://www.nlcpress.com/'
      } else if (keyword == '中国古籍保护协会') {
        return 'http://www.chinaabp.cn/'
      }
      // 返回关键词对应的链接
      // 如果每个关键词都有不同的链接，可以根据关键词进行判断并返回不同的链接
    },
    login() {
      const currentPath = this.$router.currentRoute.path;
      if (currentPath !== '/') {
        this.$router.replace({path: '/'});
      }
    },
    register() {
      const currentPath = this.$router.currentRoute.path;
      if (currentPath !== '/register') {
        this.$router.replace({path: '/register'});
      }
    },
    home() {
      const currentPath = this.$router.currentRoute.path;
      if (currentPath !== '/headers') {
        this.$router.replace({path: '/headers'});
      }
    },
  }
}
</script>

<style scoped>

.footer {
  background-color: #f0f0f0; /* 底部栏的背景颜色 */
  padding: 20px; /* 添加一些内边距，使内容与边框有间隔 */
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