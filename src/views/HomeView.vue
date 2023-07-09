<template>
  <div class="home">
    <Headers />
    <Body />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Headers from "@/common/Headers.vue";
import Footer from "@/common/Footer.vue";
import Body from "@/components/Body.vue";
export default {
  name: 'HomeView',
  components: {
    Footer,
    Body,
    Headers,

  }
}
</script>
