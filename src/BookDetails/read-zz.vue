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
              <span style="color: #222;">{{ BasicInformation.name }}</span>
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
            <el-button round @click="add()">加入书架</el-button>
            <a @click="report()"><i class="el-icon-warning-outline">举报</i></a>
          </div>

        </div>
        <!--        右\-->
        <div class="BasicInformation-right">
          <el-card style="width: 260px;height: 191px">
            <div style="height: 65px;">
              <div class="block">
                <el-avatar :size="60" :src="circleUrl" style="margin-top: 2px;float: left"></el-avatar>
              </div>
              <div style="padding: 10px 0 0 70px">
                <b>{{ BasicInformation.author }}</b>
                <br>
                <div style="margin-top: 5px;margin-left: 4px">
                  <span
                      style="background-color: #222222;color: #fce0b0 ;padding: 5px;border-radius: 13px;font-size: 14px">本书作者</span>
                </div>
              </div>
            </div>
            <div style="height: 70px;overflow: hidden ;">
              <div style="width: 80px;height: 43px;margin-top: 14px;text-align: center; float: left">
                <div style="height: 21px">
                  <span style="font-size: 20px">{{ TotalNumberOfWorks }}</span>本
                </div>
                <div style="height: 22px;font-size: 13px">
                  <span>作品总数</span>
                </div>
              </div>
              <div style="width: 90px;height: 43px;margin-top: 14px;text-align: center; float: left">
                <div style="height: 21px">
                  <span style="font-size: 20px">{{ Cumulative }}</span>万
                </div>
                <div style="height: 22px;font-size: 13px">
                  <span>累计字数</span>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <!--      文章简介-->
      <div style="margin-top: 20px;font-size: 24px">
        <b>作品介绍</b>
        <el-divider></el-divider>
      </div>
      <div>

        <div>
          <b style="margin-top: 20px;font-size: 24px">简介</b>
          <p>{{ BasicInformation.introduction }}</p>

        </div>
        <el-divider></el-divider>
        <div>
          <canvas ref="pdfCanvas" style="width: 100%; height: 100%;"></canvas>
        </div>

        <div>
          <button @click="previousPage" :disabled="currentPage === 1">上一页</button>
          <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
        </div>
      </div>


    </el-main>
    <Footer/>
  </div>
</template>

<script>
import axios from "axios";
import Footer from "@/common/Footer";
import SecondHeader from "@/components/SecondHeader.vue";
import Headers from "@/common/Headers";
import * as pdfjsLib from "pdfjs-dist";
import PDFJSWorker from 'pdfjs-dist/build/pdf.worker.entry';

export default {

  components: {Headers, SecondHeader, Footer},

  data() {
    let id = location.search.split("=")[1];
    return {
      //详细介绍

      comment: {content: ""},
      //书名 作者 借阅数量 详细资料 出版社 封面 出版时间 子标签分类
      BasicInformation: [],

      //作者头像
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      Cumulative: "1763.55",
      TotalNumberOfWorks: "3",
      currentPage: 1,
      totalPages: 0,
      pdfDocument: null,
      pdfCanvas: null,
      PdfUrl:''
    }
  },

  methods: {
    loadPdf(url) {
      return pdfjsLib.getDocument(url)
          .promise.then(pdf => {
            this.pdfDocument = pdf;
            this.totalPages = pdf.numPages;
          });
    },
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
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.renderPage();
      }
    },

    //根据id跳转页面
    read() {
      let id = location.search.split("=")[1];
      let Url = 'http://localhost:8081/v1/bookDetailsPage/Article-content/' + id;
      console.log('url=' + url)
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .get(Url).then((response) => {
        this.$router.push('/ArticleContent');
      })
    },
    //加入到书架
    add() {
      let Url = '';
      console.log('url=' + url)
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .get(Url).then((response) => {

      })
    },
    //点击举报的时候把书籍id也传进去
    report() {

    },
    originate() {
      //起始 需要的信息
      //文章信息
      let id = location.search.split("=")[1];
      let Url = 'http://localhost:8081/v1/bookDetailsPage/Basic-information/' + id;
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .get(Url).then((response) => {
        this.BasicInformation = response.data.data
      })

    },
    //todo 加备注
    parentUrl() {
      let id = location.search.split("=")[1];
      let Url = 'http://localhost:8081/v1/bookDetailsPage/Article-content/' + id;
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .get(Url).then((response) => {
        this.PdfUrl = response.data.data
      })
    }
  },
  mounted() {

    // this.originate()
    // this.parentUrl()
    // pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker;
    //
    // this.pdfCanvas = this.$refs.pdfCanvas;
    // let id = location.search.split("=")[1];
    // const url = 'http://192.168.64.1:9000/files/f9ae2cf9-b32d-4a0a-8647-5945ba3f356a-JAVA_WEB_03JAVASCRIPT.pdf';// 替换为你的 PDF 文件路径
    // let Url = 'http://localhost:8081/v1/bookDetailsPage/Article-content/' + id;
    //
    // this.axios
    //     .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
    //     .get(Url).then((response) => {
    //
    //   //this.url = response.data.data.pdfUrl.split("\\?")[0]
    //
    //
    //
    //   console.log('url=' + this.url)
    // })
    // this.loadPdf(url)
    //     .then(() => this.renderPage())
    //     .catch(error => {
    //       console.error('加载 PDF 文件时出错：', error);
    //     });
    pdfjsLib.GlobalWorkerOptions.workerSrc = '<path to pdf.worker.js>';

    this.pdfCanvas = this.$refs.pdfCanvas;
    let id = location.search.split("=")[1];
    const Url = 'http://localhost:8081/v1/bookDetailsPage/Article-content/' + id;

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
  width: 1500px;
  margin: 0 auto;
  text-align: left; /* 让文本向左对齐 */
}

#pdfViewer {
  width: 100%;
  height: 1000px;
  border: none;
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