<template>
  <div>
    <el-button>111</el-button>
    <div>
      {{ props.data.longitude }}
    </div>
    <div>
      {{ props.data.latitude }}
    </div>
  </div>
</template>

<script setup lang="ts" name="test">

const props = defineProps({
  data: ''
})
</script>

<style scoped lang="scss">

</style>
