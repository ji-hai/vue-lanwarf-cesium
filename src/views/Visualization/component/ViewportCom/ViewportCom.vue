<template>
  <div class="viewport"> 111 </div>
</template>

<script setup lang="ts">
import { fitChartSize } from './px2viewport'

console.log(fitChartSize(100))

</script>
<style lang="less" scoped>
@import './px2viewport.less';
.viewport {
  color: @divider;
//   vw(height, 100);
  background-color: red;
}
</style>
