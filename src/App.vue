<template>
  <div id="app">
    {{book}}
    <router-view/>
  </div>

</template>



<style>
* {
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: #1a1a1a;
}

#app {
  color: #222222;
  background-color: #333;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

h1 {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
}

p {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 10px;
}

button {
  background-color: #f50057;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
}

button:hover {
  background-color: #ff0059;
}
</style>
