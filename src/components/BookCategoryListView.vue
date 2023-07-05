<template>
  <div style="margin-right: 50px;margin-left: 50px">
    <el-container>
      <el-aside width="250px" height="1000px">
        <div>
          <el-menu mode="horizontal" collapse="true" background-color="#D3DCE6">
            <el-submenu v-for="category in categories" :key="category.id" :index="category.id" mode="horizontal">
<!--              <a @click="handleCategoryClick(category.id)">{{ category.name }}</a>-->
              <template slot="title">{{ category.name }}</template>
              <el-menu-item :index="'1-' + subcategory.id" v-for="subcategory in subcategories" :key="subcategory.id">{{subcategory.name}}</el-menu-item>
            </el-submenu>
<!--            <el-submenu index="2" mode="horizontal">
              <template slot="title">女生</template>
              <el-menu-item index="2-1" v-for="category in categories" :key="category.id">{{categories.name}}</el-menu-item>
            </el-submenu>
            <el-submenu index="3" mode="horizontal">
              <template slot="title">状态</template>
              <el-menu-item index="3-1">已完结</el-menu-item>
              <el-menu-item index="3-2">连载</el-menu-item>
            </el-submenu>-->
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-header>
          <div>
            <el-menu mode="horizontal">
              <el-menu-item>人气排序</el-menu-item>
              <el-menu-item>借阅量</el-menu-item>
              <el-menu-item>推荐榜</el-menu-item>
            </el-menu>
          </div>
        </el-header>
        <el-main>
          <el-row>
            <el-col :span="6" v-for="(o, index) in 3" :key="o" :offset="index > 0 ? 3 : 0">
              <el-card :body-style="{ padding: '0px' }">
                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                <div>
                  <div style="width: 300px;height: 30px;margin-top: 5px">
                    <span style="text-align: center">作者:我吃西红柿</span>
                  </div>
                  <span>好吃的汉堡</span>
                  <div class="bottom clearfix">
                    <time class="time">{{ currentDate }}</time>
                    <el-button type="text" class="button">查看书籍详情</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-button>按钮</el-button>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>
export default {
  name: "BookCategoryListView",
  data() {
    return {
      categories: [],
      subcategories: [],
      currentParentId: 0,
    };
  },
  methods: {
    // 加载类别列表
    loadCategoryList() {
      let url = 'http://localhost:8081/categories/list';
      console.log('url = ' + url);

      this.axios.get(url).then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.categories = jsonResult.data.list;
        }
      });
    },

    //加载二级目录列表
    loadCategoryByParentIdList(){
      let url = 'http://localhost:8081/categories/list-by-parent?queryType=all&parentId=' + this.currentParentId;
      console.log('url = '+url);

      this.axios.get(url).then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.subcategories = jsonResult.data.list;
        }
      })
    },
  },

  mounted() {
    this.loadCategoryList();
    this.loadCategoryByParentIdList();
  }
}
</script>

<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 1px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
</style>