<template>
<div>
  <el-carousel height="150px">
    <el-carousel-item v-for="item in bannerArr" >
      <img :src="item.imgUrl" width="100%">
    </el-carousel-item>
  </el-carousel>
</div>
</template>
<script>
export default {
  data() {
    return {
      bannerArr:[]
    }


  },
  methods:{
    //展示轮播图
    bannerList(){
      let url='http://localhost:8081/v1/front/banner';
      console.log('url='+url)
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('localJwt')}})
          .get(url).then((response)=>{
        this.bannerArr=response.data.data;
      })

    }

  },
  mounted() {
    this.bannerList();
  }
}

</script>