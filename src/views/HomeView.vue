<template>
  <div class="home">
    <Headers />

    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Headers from "@/common/Headers.vue";
import Footer from "@/common/Footer.vue";
export default {
  name: 'HomeView',
  components: {
    Footer,
    Headers,

  }
}
</script>
