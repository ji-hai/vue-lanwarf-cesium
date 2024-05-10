<script setup lang="ts">
import ViewPort from './component/ViewportCom/ViewportCom.vue'
defineOptions({
  name: 'ViewPort'
})
</script>

<template>
  <ViewPort>
    <div class="header text-font"> header </div>
    <div class="left text-font"> left </div>
    <div class="right text-font"> right </div>
  </ViewPort>
</template>

<style scoped>
.text-font {
  font-size: 30px;
  text-align: center;
  color: white;
  font-weight: 500;
}
.header {
  position: absolute;
  top: 0;
  width: 100%;
  height: 50px;
  background-color: gray;
}
.left {
  position: absolute;
  top: 50px;
  left: 0;
  width: 500px;
  height: 1030px;
  background-color: rgb(75, 62, 62);
}
.right {
  position: absolute;
  right: 0;
  top: 50px;
  width: 500px;
  height: 1030px;
  background-color: rgb(131, 123, 123);
}
</style>
