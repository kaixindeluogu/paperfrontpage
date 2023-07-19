<template>

  <div>
    <Headers/>
    <SecondHeader/>
    <el-main class="center">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 70px 0 30px 5px;font-size: 15px">
        <el-breadcrumb-item :to="{ path: '/' }" style="font-size: 18px;margin-top: -2px">首页</el-breadcrumb-item>
        <el-breadcrumb-item >正文</el-breadcrumb-item>
      </el-breadcrumb>
      <div style="height: 284px;padding-top: 30px; ">
        <!--        基本信息 左-->
        <div class="BasicInformation-Left">
          <img :src="BasicInformation.
            cover" width="100%" height="100%"></img>

        </div>
        <!--        中-->
        <div class="BasicInformation-middle">
          <!--          第一行-->
          <div style="height: 35px">
            <div style="font-size: 25px;">
              <!--              书名-->
              <span style="color: #222;font-family: 'Open Sans', Sans-serif">{{ BasicInformation.name }}</span>
            </div>
          </div>
          <!--第一行结束-->
          <!--          第二行-->
          <div style="font-size: 15px ; margin-top: 10px ;height: 22px">
            <div style="float: left;
            /*子标签*/
            margin-right: 7px;border: 1px solid grey;border-radius: 5px;">{{ BasicInformation.categoryName }}
            </div>
          </div>
          <!--          第三行-->
          <div style="font-size: 15px;height: 20px;margin: 12px 0">
            作者:<b>{{ BasicInformation.author }}</b>
          </div>
          <div style="margin: 32px 0 32px 0;height: 24px;font-size: 16px;color: #666">
            <b class="script">{{ BasicInformation.borrowingVolume }}</b><span>次借阅</span>
            <el-divider direction="vertical" class="spacing"></el-divider>
            <b class="script">{{ BasicInformation.publisher }}</b><span>出版社</span>
          </div>
          <!--          第四行-->
          <div style="margin: 0 ;font-size: 14px">
            出版日期:<span style="margin: 0 10px 0 10px ;font-size: 15px">{{ BasicInformation.publishTime }}</span>
          </div>
          <div style="margin-top: 15px">
            <el-button type="warning" round style="margin-right: 17px; color: #222" @click="read()"><b>开始阅读</b>
            </el-button>
            <el-button round @click="add()">{{bookshelf}}</el-button>
            <a @click="report()"><i class="el-icon-warning-outline">举报</i></a>
          </div>

        </div>



      </div>
      <!--      文章简介-->
      <div style="margin-top: 20px;font-size: 24px">
        <b>作品介绍</b>
        <el-divider></el-divider>
      </div>
      <div>
<!--简介开始-->
        <div>
          <b style="margin-top: 20px;font-size: 24px">简介</b>
          <p>{{ BasicInformation.introduction }}</p>
        </div>
<!--简介结束-->
        <el-divider></el-divider>
<!--文章内容开始-->
        <div style="width: 1200px;margin: 0 auto">
          <canvas ref="pdfCanvas" style="width: 100%; height: 100%;"></canvas>
        </div>
<!--文章内容结束  -->
        <div style="  display: flex;
  justify-content: center;margin-top: 20px;font-size: 23px;">
          <button @click="previousPage" :disabled="currentPage === 1" class="size"><i class="el-icon-d-arrow-left"></i></button>
          <b style="margin: 10px 30px 0 30px;font-size: 26px">{{currentPage}}</b>
          <button @click="nextPage" :disabled="currentPage === totalPages"class="size">
            <i class="el-icon-d-arrow-right"></i>
          </button>
        </div>
      </div>


    </el-main>
    <Footer/>
  </div>
</template>

<script>

import Footer from "@/common/Footer";
import SecondHeader from "@/components/SecondHeader.vue";
import Headers from "@/common/Headers";
import * as pdfjsLib from "pdfjs-dist";
import PDFJSWorker from 'pdfjs-dist/build/pdf.worker.entry';

export default {

  components: {Headers, SecondHeader, Footer},

  data() {

    return {
      //详细介绍
      bookshelf:'',
      comment: {content: ""},
      //书名 作者 借阅数量 详细资料 出版社 封面 出版时间 子标签分类
      BasicInformation: [],
      currentPage: 1,
      totalPages: 0,
      pdfDocument: null,
      pdfCanvas: null,
      PdfUrl:'',
      pdfNumPages:'',
      //用户id
      UserId:'',
      //bookId
      id:'',
      traceNo:'',
      sum:{userId:'',bookId:''}
    }
  },

  methods: {
    loadPdf(url) {
      return pdfjsLib.getDocument(url)
          .promise.then(pdf => {
            this.pdfDocument = pdf;
            this.totalPages = 3;

          });
    },
    //渲染pdf页面
    renderPage() {
      this.pdfDocument.getPage(this.currentPage)
          .then(page => {
            const viewport = page.getViewport({scale: 1});
            const context = this.pdfCanvas.getContext('2d');

            this.pdfCanvas.height = viewport.height;
            this.pdfCanvas.width = viewport.width;

            page.render({
              canvasContext: context,
              viewport: viewport
            });
          })
          .catch(error => {
            console.error('渲染 PDF 页面时出错：', error);
          });
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.renderPage();
      }
    },

    //弹框：没有购买此书会弹出此框
    open() {
      this.$confirm('点击开始阅读观看之后内容', '提示', {
        confirmButtonText: '去点击',
        cancelButtonText: '否',
        type: 'warning',
        center: true
      }).then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消',
        });
      });},
    //点击下一页的时候
    nextPage() {
      if (this.currentPage == 2){
        this.open();
      }else {
        if (this.currentPage < this.totalPages){
          this.currentPage++;
          this.renderPage();
        }
      }


    },
    //根据id跳转页面
    read() {

      this.$router.push({ name: '/ArticleContent', query: { id: this.id } });

    },
    //添加到书架
    ViewCollection(){
      let Url = 'http://localhost:8081/v1/favorites/selectbook';
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .post(Url,this.sum).then((response) => {
        console.log("===========++++++++++++"+response.data.state)
        console.log("===========++++++++++++"+response.data.data)
        if (response.data.state==20000){
          if (response.data.data == 0){
            this.bookshelf='添加书架';
          }
        }else {
          this.bookshelf='已添加';
        }
      })
    },
    //加入到书架
    add() {
      if (this.bookshelf == '添加书架'){

        let Url = 'http://localhost:8081/v1/favorites/addbook';
        this.axios
            .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
            .post(Url,this.sum).then((response) => {
          console.log("===========sssssssssssssss"+response.data.state)
          if (response.data.state==20000){
            this.bookshelf='已添加';
            this.$message({
              type: 'success',
              message: '添加成功'})
          }
        })
      }

    },
    //点击举报的时候把书籍id也传进去
    report() {

    },
    originate() {
      //起始 需要的信息
      //文章信息
      let Url = 'http://localhost:8081/v1/bookDetailsPage/Basic-information/'+this.id;
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .get(Url).then((response) => {
        this.BasicInformation = response.data.data
      })

    }
  },
  mounted() {

    //获取url上的bookId
    this.id = location.search.split("=")[1];
    //查阅 用户id
    this.UserId=localStorage.getItem("id");
    //查询书架信息和修改书架信息所需要的返回参数
    this.sum.userId = this.UserId;
    this.sum.bookId = this.id;
    //添加到书架
    this.ViewCollection();
    //文章基本信息
    this.originate();
    //设置 PDF.js 库中的全局工作器
    pdfjsLib.GlobalWorkerOptions.workerSrc = '<path to pdf.worker.js>';
    //
    this.pdfCanvas = this.$refs.pdfCanvas;

    //获取pdf文件并交给pdf组件
    const Url = 'http://localhost:8081/v1/bookDetailsPage/Article-content/'+this.id ;
    this.axios.create({
      headers: {
        Authorization: localStorage.getItem('jwt')
      }
    }).get(Url).then((response) => {
      console.log("url"+response.data.data)
      this.PdfUrl = response.data.data
      console.log(this.PdfUrl)
      this.loadPdf(this.PdfUrl)
          .then(() => this.renderPage())
          .catch(error => {
            console.error('加载 PDF 文件时出错：', error);
          });
    });
  }
  ,


// this.Bookid = this.$route.query.id;


}
</script>

<style>
.center {
  width: 1390px;
  margin: 0 auto;
  text-align: left; /* 让文本向左对齐 */
}
.size{
  border: none
}


.el-icon-warning-outline {
  font-size: 14px;
  margin-left: 20px;
  color: #666;
}

.script {
  font-size: 19px;
  color: #222;
}

.spacing {
  margin-right: 20px;
}

.BasicInformation-Left {
  width: 200px;
  height: 265px;
  float: left;
  color: #bfd7ff;
  overflow: hidden
}

.BasicInformation-middle {
  margin-left: 50px;
  width: 700px;
  float: left;
  overflow: hidden;
}

.BasicInformation-right {
  width: 400px;
  float: right;
  overflow: hidden
}

.smallSquare {
  float: left;
  color: white;
  border-radius: 4px;
  background-color: #12b262;

}
</style>