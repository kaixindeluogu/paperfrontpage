
<template>
  <div class="container">
    <div class="gallery">
      <div class="book-details" v-for="(book, index) in books" :key="index">
        <div class="book-image">
          <img :src="book.cover" >
        </div>
        <div class="book-info">
          <h2 class="book-name">{{ book.name }}</h2>
          <p class="book-author">{{ book.author }}</p>
          <div class="book-introduction">
            <p>{{ book.introduction }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleEdit(){
      this.value = 1;
    },
    changePage(page) {
      this.$router.replace('?page=' + page);
      this.loadReportList();
    },
    loadReportList(tableItem) {
      {
        let url = 'http://localhost:8081/v1/bookDetails' + tableItem.A+'/bookDeatils';
        console.log('url = ' + url);

      }
    }
  },
  mounted() {
    this.loadReportList();
  },
  data() {
    return {
      books: [{
        id:'1',name:'',cover:'',author:'',introduction:''
      }]
    };
  }
};
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 20px;
  padding: 20px;
  box-sizing: border-box;
}

.book-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid #ccc;
  padding: 10px;
}

.book-image img {
  width: 180px;
  height: 180px;
}
</style>