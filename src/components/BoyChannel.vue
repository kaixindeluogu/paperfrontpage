<template>
  <el-row style="background-color: white">
    <el-col span="3">
      <p style="font-size: 28px;line-height: 65px;margin: 0">男生频道</p>
    </el-col>

    <el-col span="21">
      <!--我的课程导航开始-->

      <el-menu mode="horizontal" default-active="0" active-text-color="orange">
        <el-menu-item :index="'1-' + category.id" v-for="category in categories" :key="category.id">{{category.name}}</el-menu-item>
      </el-menu>
      <!--我的课程导航结束-->
    </el-col>
    <el-row gutter="20">
      <el-col v-for="r in 4" span="6">
        <el-card style="margin: 10px 0">
          <img :src="books.cover" width="100%" height="144">
          <p style="height: 40px">{{books.name}}</p>
          <p></p>
          <el-row gutter="20">
            <el-col span="4">
            </el-col>
            <el-col span="10" style="color: #0aa1ed">{{books.author}}</el-col>
            <el-col span="10">
              <span style="float: right;font-size: 12px;color: #ccc;position: absolute;right: 2px">阅读量:{{books.borrowingVolume}}</span>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "BoyChannel",
  data(){
    return{
      categories: [
        {id:'3'}
      ],
      books: []
    };
  },
  methods: {
    //加载男频列表
    loadCategoryList() {
      let categoryId = 1;
      let url = 'http://localhost:8081/v1/categories/'+categoryId;
      console.log('url = ' + url);

      this.axios.get(url).then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.categories = jsonResult.data.data;
        }
      });
    },

    //加载男频图书列表
    loadBookList() {
      let url = 'http://localhost:8081/books/list-by-category/'+categories.id;
      console.log('url = '+url);

      this.axios.get(url).then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.books = jsonResult.data.data;
        }
      })
    }
  },
  mounted() {
    this.loadCategoryList();
    this.loadBookList();
  }
}
</script>

<style scoped>

</style>