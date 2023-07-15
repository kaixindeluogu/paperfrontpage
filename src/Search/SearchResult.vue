<template>
  <div>
    <Headers/>
    <SecondHeader/>
    <br>
    <br>
    {{$route.params.wd}}
    <div class="book-list">
      <div v-for="item in book" class="book-item">
        <el-table-column label="封面">
          <div class="book-frame">
            <div class="book-details">
              <div class="book-cover">
                <div class="book-cover-inner">
                  <img :src="item.cover" @click="inBookDetails(item.id)">
                </div>
              </div>
              <div class="book-info">
                <div class="book-description-top">
                  <p class="book-name"  @click="inBookDetails(item.id)">&nbsp{{item.name}}</p>
                  <p class="book-author">{{item.author}}
                    <i >{{item.publishTime}}出版</i></p>
                </div>
                <p class="book-introduction ellipsis">{{item.publisher}}</p>
              </div>
            </div>
          </div>
        </el-table-column>
      </div>
    </div>
    <Footer/>
  </div>
</template>
<script>
import Footer from "@/common/Footer";
import SecondHeader from "@/components/SecondHeader.vue";
import Headers from "@/common/Headers";
export default {
  components: {Headers, SecondHeader, Footer},
  watch: {
    $route(to, from) {
      // 检查搜索参数是否发生变化
      if (to.params.wd !== from.params.wd) {
        // 搜索参数发生变化，重新获取搜索结果
        this.getSearchResults(to.params.wd);
      }
    }
  },
  data() {
    return {
      wd: '',
      na:'',
      book: [],
    };
  },
  methods: {
    getSearchResults(keyword) {
      // 发起搜索请求，并更新搜索结果
      this.search();
    },
    search() {
      let url = 'http://localhost:8081/v1/search/'+this.$route.params.wd;
      let params = {
        wd: this.$route.params.wd
      };
      this.axios
          .create({ 'headers': { 'Authorization': localStorage.getItem('jwt') } })
          .get(url, { params: params }) // 将参数作为配置对象的params属性传递给get方法
          .then(response => {
            if (response.data.state == 20000) {
              this.book = response.data.data;
              this.book.cover = response.data.cover;
              this.book.name = response.data.name;
              this.book.author = response.data.author;
              this.book.publishTime = response.data.publishTime;
              this.book.publisher = response.data.publisher;
            }
            window.abc = this.book.name;
          });
    },
    inBookDetails(id){
      this.$router.push({ name: '/readZz', query: { id: id } });
    },
  },
  created() {
    this.search();
  },
  mounted() {
    this.fetchBookDetails();
  }
};
</script>

<style scoped>

.book-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.book-item {
  flex: 0 0 30%;
  margin-bottom: 20px;
  animation: bookAnimation 1s ease-in-out;
}

@keyframes bookAnimation {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.book-frame {
  background-color: #f2f2f2;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.book-details {
  display: flex;
  align-items: center;
}

.book-cover {
  width: 90px;
  height: 130px;
  margin-right: 10px;
  position: relative;
  overflow: hidden;
}

.book-cover-inner {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
}

.book-cover:hover .book-cover-inner {
  transform: scale(1.2);
}

.book-image {
  width: 100%;
  height: auto;
}

.book-info {
  flex-grow: 1;
}

.book-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

.book-author {
  font-size: 14px;
  color: #888;
}

.book-introduction {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
}


/*书籍详情样式*/
.book-list {
  display: flex;
  flex-wrap: wrap;
  margin-right: 20px;
}

.book-item {
  flex: 0 0 calc(100% / 3.1);
  padding: 1px;
  box-sizing: border-box;
  margin-right: 10px;
}

.book-frame {

  padding: 10px;
  border-radius: 10px;
  background-color: rgba(255,255,255,0.5)/* 修改为你想要的背景颜色 */
}

.book-details {
  display: flex;
  align-items: flex-start;
}

.book-cover {
  width: 170px;
  height: 194px;
  margin-right: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border: 2px solid #fff;
}

.book-cover-inner {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.book-cover-inner img {
  width: auto;
  height: 100%;
  object-fit: cover;
}

.book-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
}

.book-description-top {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 10px;
}

.book-name {
  font-family: "STKaiti", "LiSu", "SimSun", "serif";
  line-height: 1.5;
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

.book-author {

  font-size: 10px;
  margin: 15px 15px;

}

.book-introduction {
  font-size: 12px;
  margin-top: 20px;
  max-height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.overflow-visible {
  max-height: none;
  white-space: normal;
}

.ellipsis {
  cursor: pointer;
}

.book-introduction.ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

}
</style>