<template>
  <div class="home">
<!--  该div用于跟头部粘连显示，别删  -->
    <div style="height: 15px">

    </div>
    <el-main class="custom-main" style="background-color: white;">
      <el-row :gutter="20">
        <el-col :span="15" style="border: 1px solid white">
          <div class="main_div_button">
<!--            轮播图上方分类-->
            <div class="button-wrapper">
              <div class="button"><i class="el-icon-paperclip" style="font-size: 20px;color: pink"></i>
                <div><a href="#">IT</a></div>
              </div>
              <div class="button"  v-for="category in categories">
                <a href="#">
                <!-- 111显示点赞量 各个分类 -->
                <button>111</button>
                <div>{{category.name}}</div>
              </a></div>
            </div>

          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple" style="font-size: 24px">
            <i class="el-icon-paperclip" style="font-size: 24px;color: pink"></i><a href="#"style="text-decoration: none;color: black">广场</a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i class="el-icon-paperclip" style="font-size: 24px;color: pink"></i><a href="#"style="text-decoration: none;color: black">小黑屋</a>
          </div>
        </el-col>

        <el-col :span="1">
          <div class="grid-content bg-purple">logo</div>
        </el-col>
      </el-row>

      <el-row :gutter="10">
<!--        轮播图-->

        <el-col :span="14" style="margin-top: 20px;text-align: center;">
         <BannerView />
        </el-col>

        <el-col :span="10" style="margin-top: 20px;text-align: center;background-color: white">
          <el-col v-for="r in 3" span="8">
            <div class="image-with-text">
              <img style="border-radius: 10%;"
                   src="https://cdn.tmooc.cn/bsfile//imgad///2d312700f1b14fbfa123dfa0ae987bdf.jpg" width="100%"
                   height="144">
              <div class="text-overlay">这是图片上的文字</div>
            </div>
          </el-col>
          <el-col v-for="r in 3" span="8">
            <div class="image-with-text">
              <img style="border-radius: 10%;"
                   src="https://cdn.tmooc.cn/bsfile//imgad///2d312700f1b14fbfa123dfa0ae987bdf.jpg" width="100%"
                   height="144">
              <div class="text-overlay">这是图片上的文字</div>
            </div>
          </el-col>
        </el-col>
      </el-row>

      <el-row style="background-color: white">
        <el-col span="3">
          <p style="font-size: 28px;line-height: 65px;margin: 0">推荐图书</p>
        </el-col>

        <el-col span="21">
          <!--我的课程导航开始-->

          <el-menu mode="horizontal" default-active="0" active-text-color="orange">
            <el-menu-item index="0">IT</el-menu-item>
            <el-menu-item index="1">健身运动</el-menu-item>
            <el-menu-item index="2">音乐</el-menu-item>
            <el-menu-item index="3">游戏</el-menu-item>
            <el-menu-item index="4">这是后期根据用户购买的课程</el-menu-item>
          </el-menu>
          <!--我的课程导航结束-->
        </el-col>
      </el-row> <BookDetails />
      <el-row gutter="20">
        <el-col v-for="r in 4" span="6">
          <el-card style="margin: 10px 0">
            <img src="@/assets/a.jpg" width="100%" height="144">
            <p style="height: 40px">健身</p>
            <p></p>
            <el-row gutter="20">
              <el-col span="4">
              </el-col>
              <el-col span="10" style="font-size: 12px">开通日期:<br>2303/6/9</el-col>
              <el-col span="10">
                <span style="float: right;font-size: 12px;color: #ccc">班级:JSD2303</span>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <div style="text-align: center;margin-bottom: 20px">
        <el-button>后期添加v-if 用户所购买的视频超过页面展示的4个之后 出现该按钮 向下展示后买的所有视频</el-button>
      </div>
      <!--我的课程列表结束-->

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
        <p></p>
      </div>
      <!--精品课程列表结束-->

      <el-row style="background-color: white">
        <el-col span="3">
          <p style="font-size: 28px;line-height: 65px;margin: 0"><i class="el-icon-data-line">会员课程</i></p>
        </el-col>
      </el-row>
      <!--会员课程列表开始-->
      <el-row gutter="20">
        <el-col v-for="r in 4" span="6">
          <el-card style="margin: 10px 0">
            <img src="@/assets/a.jpg" width="100%" height="144">
            <p style="height: 40px">健身</p>
            <p></p>
            <el-row gutter="20">
              <el-col span="4">
              </el-col>
              <el-col span="12" style=" color: red;font-size: 14px">￥1.00(会员免费)</el-col>
              <el-col span="8">
                <span style="float: right;font-size: 12px;color: #ccc;position: absolute;right: 2px">已有xxx人预约</span>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <div style="text-align: center;margin-bottom: 20px">
        <p></p>
      </div>
      <!--会员课程列表结束-->
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
      categories:[
      ],

  }

  },
  methods: {

    handleClick() {
      window.scrollTo(0, 0);
    },
    jumpHtml() {
      window.open('http://baidu.com', '_blank');
    },
    jumpMessage() {
      window.open('http://baidu.com', '_blank');
    }
  }
}
</script>

<style>
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

.main_div_button {
  position: relative;
}

.button-wrapper {
  position: absolute;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button {
  margin: 0 20px;
}

.button button {
  background-color: pink; /* 设置按钮的背景颜色为粉色 */
}

/*图片上的文字*/
.image-with-text {
  position: relative;
  display: inline-block;
}

.image-with-text img {
}

.image-with-text .text-overlay {
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding: 10px;
}

</style>