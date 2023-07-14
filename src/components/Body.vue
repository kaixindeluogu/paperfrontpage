<template>
  <div class="home">
    <el-main class="custom-main" style="background-color: white;">
      <el-row :gutter="10">
<!--        轮播图-->
        <el-col :span="14" style="margin-top: 20px;text-align: center;">
         <BannerView />
        </el-col>

        <el-col :span="10" style="margin-top: 20px;text-align: center;background-color: white">

          <el-col v-for="(book,index) in books " span="8">

            <div class="image-with-text" >
              <template v-if="index === 0">
                <!-- 在第一张位置添加自定义文字 -->
                <div class="text-overlay" @click="GOBookDetails(book.id)">
                  <h3>畅销榜</h3>

                </div>
              </template>
              <template v-else>
              <img style="border-radius: 10%;width: 144px; height: 144px;margin-bottom: 10px;"
                   :src="book.cover" @click="GOBookDetails(book.id)">
              <div class="text-overlay" @click="GOBookDetails(book.id)">

                {{book.name}}</div>
              </template>
            </div>
          </el-col>
        </el-col>
      </el-row>

      <el-row style="background-color: white">
        <el-col span="3">
          <p style="font-size: 28px;line-height: 65px;margin: 0">推荐图书</p>
        </el-col>
        <el-col span="21">

          <el-menu mode="horizontal" default-active="0" active-text-color="orange">
            <el-menu-item index="0">IT</el-menu-item>
            <el-menu-item index="1">文艺</el-menu-item>
            <el-menu-item index="2">科幻</el-menu-item>
            <el-menu-item index="3">网文小说</el-menu-item>
            <el-menu-item index="4">教育读书</el-menu-item>
          </el-menu>
          <!--我的课程导航结束-->
        </el-col>
      </el-row>

<!--     图书详情 -->
      <BookDetails />

      <el-row style="background-color: white">
        <el-col span="3">

          <p style="font-size: 28px;line-height: 65px;margin: 0">
            <i class="el-icon-video-booker">精品书籍</i>
          </p>
        </el-col>
      </el-row>

      <!--精品课程列表开始-->
      <el-row gutter="20">
        <el-col v-for="r in 4" span="6">
          <el-card style="margin: 10px 0">
            <img src="@/assets/a.jpg" width="100%" height="144">
            <p style="height: 40px">健身</p>
            <p></p>
            <el-row gutter="20">
              <el-col span="4">
              </el-col>
              <el-col span="10" style="color: #0aa1ed">免费</el-col>
              <el-col span="10">
                <span style="float: right;font-size: 12px;color: #ccc;position: absolute;right: 2px">已有xxx人观看</span>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <div style="text-align: center;margin-bottom: 20px">
      </div>
      <!--精品课程列表结束-->
    </el-main>


    <div style="text-align: right;position: fixed;position: fixed;
						  right: 20px;
						  bottom: 20px;
						  z-index: 999;
					">
      <button v-if="true" @click="handleClick()" class="el-icon-upload2"
              style="font-size: 40px; color: #FFC0CB;background-color: transparent; border: 0;">
        <br>
        <a @click.prevent="jumpHtml()" class="el-icon-chat-dot-round"
           style="background-color: transparent; margin: 5px;"></a>
        <br>
        <a @click.prevent="jumpMessage()" class="el-icon-message-solid"
           style="background-color: transparent; margin: 5px;"></a>
      </button>

    </div>
  </div>
</template>

<script>

import BannerView from "@/components/BannerView.vue";
import BookDetails from "@/components/BookDetails";

export default {
  name: "Body",
  components: {
    BookDetails,
    BannerView,
  },
  data(){

    return{
      books:[],
  }

  },
  methods: {
    BookDetails() {
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .get("http://localhost:8081/v1/adver/BookByBorrow")
          .then(response => {
            console.log(localStorage.getItem('jwt'))
            if (response.data.state == 20000) {
              console.log("++++++++++++=" + response.data)
              this.books = response.data.data;

            }

          })
    },
    GOBookDetails(id){
      //todo 添加新页面的名称
      this.$router.push({ name: '/readZz', query: { id: id } });
    },
    handleClick() {
      window.scrollTo(0, 0);
    },
    jumpHtml() {
      window.open('http://baidu.com', '_blank');
    },
    jumpMessage() {
      window.open('http://baidu.com', '_blank');
    }
  },
  mounted() {
    this.BookDetails();
  }
}
</script>

<style>
h3{
  padding-top: 40px; /* 将文本水平居中 */
  writing-mode: vertical-rl;  /* 将文本以竖排显示，从右到左 */
  color: linear-gradient(to bottom, #e79924, #bf71d4);  /* 设置字体颜色渐变 */
  background: -webkit-linear-gradient(#d5921d, #b267c6);  /* 设置背景颜色渐变，确保渐变颜色与字体颜色一致 */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: "Open Sans", Sans-serif;/*字体样式*/
  font-size: 24px;  /* 设置字体大小 */
  line-height: 30px;  /* 设置行高，根据需要调整 */
  letter-spacing: 0.5em;  /* 设置字间距，根据需要调整 */
}
.home{
  max-width: 1500px; /* 设置最大宽度为1200px */
  margin-left: auto; /* 页面居中对齐 */
  margin-right: auto;
  padding-left: 20px; /* 左侧留出20px的空白间距 */
  padding-right: 100px; /* 右侧留出20px的空白间距 */

}



.custom-form-item label {
  font-size: 16px;
  color: #409EFF;
}



.gezhonganniu > img {
  padding: 0 !important;
  border-radius: 500px;
  opacity: 0.5;
  transition: opacity 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.gezhonganniu > span {
  color: #ffffff;
  opacity: 0.5;
  font-weight: bold;
  font-size: 14px;
  text-shadow: 0 0 5px #42b983; /* 将文本轮廓设置为加粗颜色 */
}

.gezhonganniu:hover > span {
  color: #409EFF;
  font-size: 14px;
  font-weight: bold;

}

.gezhonganniu:hover > img {
  padding: 0;
  border-radius: 500px;
  opacity: 1;
  box-shadow: 0 0 15px 5px #42b983; /* 设置图片外发光颜色*/
  cursor: pointer;
}

.center1 a {
  text-decoration: none;
}


.home {
  padding: 0;
  margin: 0;
  background-color: #f0f0f0;
  text-align: center; /* 居中对齐 */
}

.custom-list-item a {
  text-decoration: none; /* 移除下划线 */
  color: white; /* 设置文字颜色为白色 */
}

.custom-main {
  text-align: center; /* 居中对齐 */
}

.custom-main .main_div_button a {
  color: black;
  text-decoration: none;
}


.button button {
  background-color: pink; /* 设置按钮的背景颜色为粉色 */
}

/*图片上的文字*/
.image-with-text {
  position: relative;
  display: inline-block;
}


</style>