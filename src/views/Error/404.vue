<script setup lang="ts">
import { Error } from '@/components/Error'
import { usePermissionStore } from '@/store/modules/permission'
import { useRouter } from 'vue-router'

const { push } = useRouter()

const permissionStore = usePermissionStore()

const errorClick = () => {
  push(permissionStore.addRouters[0]?.path as string)
}
</script>

<template>
  <div class="flex justify-center m-t-10">
    <Error @error-click="errorClick" />
  </div>
</template>
