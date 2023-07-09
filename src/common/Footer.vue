<template>
  <div>
    <el-container>
      <el-footer height="200px" style="background-color: #f0f0f0; " class="footer">
        <el-row gutter="20" type="flex" justify="start" class="left-section"
                style="height: 100%">
          <el-col :span="4">
            <img src="../assets/WechatIMG21.png" height="170px" alt="Logo">
          </el-col>
          <el-col :span="10">
            <div style="position: relative;margin-left: 100px;margin-top: 50px;text-align: center;
               height: 100%;width: 100%">
              <el-row>
                <i> 友情链接:</i>
                <el-link v-for="keyword in keywords" :key="keyword" :href="getKeywordLink(keyword)">
                  {{ keyword}}||
                </el-link>
              </el-row>
            </div>
          </el-col>
          <!--    bottomright-->
          <el-col :span="10" style="padding-left: 100px;padding-top: 40px">
<!--            <img src="../assets/logo.png" height="20px">-->
            <el-row>广告链接
              <el-link v-for="item in adver"  :key="item.id" :href="item.url" >&nbsp{{item.name}}&nbsp</el-link>
            </el-row>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>

</template>

<script>

export default {
  name: "Footer",

  data() {
    return {
      adver: [
        // {id:"" ,name:"",url:""},
        ],
      keywords: ['七猫', '起点', '中国国家图书馆', '中国文化传媒网', '中国图书馆学会', '国家图书馆出版社', '中国古籍保护协会'], // 关键词数组

    }
  },
  methods: {
    //获取广告响应数据

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
    getAdver() {
      let url = 'http://localhost:8081/v1/adver/adverlist';
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .get(url)
          .then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.adver = jsonResult.data;
          // this.adver.name = jsonResult.data.data;
          // this.adver.url = jsonResult.data.data;
        } else {
          let title = '操作失败';
          this.$alert(jsonResult.message, title, {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
        }
      })
    .catch(error => {
      if (error.response && error.response.status === 4010) {
        console.log("未登录");
      }
      });
    },
  },mounted() {
    this.getAdver();
  }
}

</script>

<style scoped>
.footer {
  background-color: #f0f0f0; /* 底部栏的背景颜色 */
  padding: 20px; /* 添加一些内边距，使内容与边框有间隔 */
}
</style>