<template>
  <!--书籍详情-->
  <div class="book-list">
    <div v-for="item in book" class="book-item">
      <el-table-column label="封面">
        <div class="book-frame">
          <div class="book-details">
            <div class="book-cover">
              <div class="book-cover-inner">
                <img :src="item.cover">
              </div>
            </div>
            <div class="book-info">
              <div class="book-description-top">
                <p class="book-name">{{item.name}}</p>
                <p class="book-author">{{item.author}}</p>
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
    fetchBookDetails() {
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .get("http://localhost:8081/v1/bookDeatils/list")
          .then(response => {
            console.log(localStorage.getItem('jwt'))
            if (response.data.state == 20000) {
              console.log("++++++++++++++++++++++++++++++++++++++++=" + response.data)
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
  flex: 0 0 calc(100% / 5);
  padding: 10px;
  box-sizing: border-box;
}

.book-frame {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  background-color: paleturquoise /* 修改为你想要的背景颜色 */
}

.book-details {
  display: flex;
  align-items: flex-start;
}

.book-cover {
  width: 120px;
  height: 120px;
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
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

.book-author {
  font-size: 12px;
  margin: 0;
}

.book-introduction {
  font-size: 12px;
  margin-top: 30px;
  max-height: 36px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
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