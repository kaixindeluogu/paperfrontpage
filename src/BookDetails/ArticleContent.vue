<template>
  <div >
    <Headers/>
    <main>
      <div class="centers">
        <canvas ref="pdfCanvas" style="width: 1000px ;height: 1400px;margin-top: 50px"></canvas>
      </div>


      <div style="  display: flex;
  justify-content: center;margin-top: 20px;font-size: 23px;">
        <button @click="previousPage" :disabled="currentPage === 1" class="size"><i class="el-icon-d-arrow-left"></i></button>
        <b style="margin: 10px 30px 0 30px;font-size: 26px">{{currentPage}}</b>
        <button @click="nextPage" :disabled="currentPage === totalPages"class="size"><i class="el-icon-d-arrow-right"></i></button>
      </div>
    </main>

    <Footer/>
  </div>
</template>

<script>
import * as pdfjsLib from 'pdfjs-dist';
import PDFJSWorker from 'pdfjs-dist/build/pdf.worker.entry';
import Footer from "@/common/Footer";
import Headers from "@/common/Headers";
import axios from "axios";
export default {
  components: {Headers},
  data() {
    return {
      currentPage: 1,
      totalPages: 0,
      pdfDocument: null,
      pdfCanvas: null,
      PdfUrl:'',
      //用户id
      UserId:'',
      //bookId
      id:'',
      //唯一编码
      traceNo:''
    };
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
        sessionStorage.setItem('currentPage', this.currentPage.toString());
        this.renderPage();
      }
    },
    //查验权限 是否有vip
    PurchaseRestriction(){
      let Url = 'http://localhost:8081/v1/bookDetailsPage/limit/'+3+'/'+this.id;
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .get(Url).then((response) => {
        let tradeStatus = response.data.data;
        if (tradeStatus != 0){
          this.open();
        }
      })
    },
    //弹框：没有购买此书会弹出此框
    open() {
      this.$confirm('购买此书以观看全部章节', '提示', {
        confirmButtonText: '去购买',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        //获取traceNo
        let Url2 = 'http://localhost:8081/v1/snowflake/';
        this.axios
            .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
            .post(Url2).then((response) => {
          if (response.data.state == 20000){
            this.traceNo = response.data.data;
            console.log("------------"+this.traceNo)
          }
        })
        //向后端发送请求 调取支付宝
        let Url = 'http://localhost:8081/alipay/pay?subject='+this.BasicInformation.name+'&traceNo='+this.traceNo+'&totalAmount=7.99&userId='+3+'&bookId='+this.id;
        this.axios
            .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
            .get(Url).then((response) => {

        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });},
    //点击下一页的时候
    nextPage() {
      if (this.currentPage == 4){
        this.PurchaseRestriction();
      }else{
        if (this.currentPage < this.totalPages){
          this.currentPage++;
          this.renderPage();
          // 更新当前页码，并存储到 SessionStorage 中
          sessionStorage.setItem('currentPage', this.currentPage.toString());
        }
      }
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
    // 判断是否存在存储的页码数据
    const storedPage = sessionStorage.getItem('currentPage');
    if (storedPage) {
      this.currentPage = parseInt(storedPage);
    } else {
      this.currentPage = 1;
    }


    this.originate();
    pdfjsLib.GlobalWorkerOptions.workerSrc = '<path to pdf.worker.js>';

    this.pdfCanvas = this.$refs.pdfCanvas;
    let id = location.search.split("=")[1];
    const Url = 'http://localhost:8081/v1/bookDetailsPage/Article-content/'+id ;

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
    this.loadPdf(this.PdfUrl)
        .then(() => {
          this.renderPage();

          // 当前页码加载完成后，将页码存储到 SessionStorage 中
          sessionStorage.setItem('currentPage', this.currentPage.toString());
        })
        .catch(error => {
          console.error('加载 PDF 文件时出错：', error);
        });
  }
  ,

};
</script>
<style>
.centers {
  width: 1500px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-icon-d-arrow-left{
  font-size: 50px;
}
.el-icon-d-arrow-right{
  font-size: 50px;
}


</style>