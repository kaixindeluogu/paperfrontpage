<template>
  <div>
    <el-carousel height="288px">

      <el-carousel-item v-for="item in bannerArr" :key="item.title">
        <img :src="item.imgUrl" width="900px" >
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bannerArr: []
    }
  },
  methods: {
    //展示轮播图
    bannerList() {

      let url = 'http://localhost:8081/v1/front/banner/';
      console.log('url=' + url)
      this.axios
          .create({ 'headers' : {'Authorization': localStorage.getItem('jwt') } })
          .get(url)
          .then((response) => {
        this.bannerArr = response.data.data;
      })
          .catch(error => {
        console.error(error);
      });
    }
  },
  mounted() {
    this.bannerList();
  }
}

</script>