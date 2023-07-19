<template>
  <div class="home">
    <Headers/>
    <SecondHeader />
    <Body />
    <Footer />
  </div>
</template>

<script>
import Headers from "@/common/Headers.vue";
import Footer from "@/common/Footer.vue";
import Body from "@/components/Body.vue";
import SecondHeader from "@/components/SecondHeader.vue";
import SearchResult from "@/Search/SearchResult";
export default {
  name: 'HomeView',
  components: {
    Footer,
    Body,
    SecondHeader,
    Headers,
    SearchResult
  },
  mounted() {
    this.userLogin();
  },
};
</script>

<style>

</style>
