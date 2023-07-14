<template>
  <!--书籍详情-->
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
              <p class="book-introduction ellipsis">{{item.introduction}}</p>
            </div>
          </div>
        </div>
      </el-table-column>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      book: [],
    }
  },
  methods: {
    inBookDetails(id){
      //todo 添加新页面的名称
      this.$router.push({ name: '/readZz', query: { id: id } });
    },
    fetchBookDetails() {
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .get("http://localhost:8081/v1/bookDeatils/list")
          .then(response => {
            console.log(localStorage.getItem('jwt'))
            if (response.data.state == 20000) {
              console.log("++++++++++++=" + response.data)
              this.book = response.data.data;
              this.book.cover = response.data.cover;
              this.book.name = response.data.name;
              this.book.author = response.data.author;
              this.book.introduction = response.data.introduction;
            }
            window.abc = this.book.name
          })
    }
  },
  mounted() {
    this.fetchBookDetails();
  }
}
</script>

<style scoped>
/*书籍详情样式*/
.book-list {
  display: flex;
  flex-wrap: wrap;
}

.book-item {
  flex: 0 0 calc(100% / 3.5);
  padding: 10px;
  box-sizing: border-box;
  margin-right: 30px;
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