<template>
  <h1>您无权访问该页面,3秒后自动跳转回首页</h1>
</template>

<script>

setTimeout(function() {
  window.location.href = "/";
}, 3000);

</script>


