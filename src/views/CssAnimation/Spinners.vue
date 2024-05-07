<script setup lang="ts">
import { ref } from 'vue'
import { ContentWrap } from '@/components/ContentWrap'
import { ElCard, ElLink } from 'element-plus'

defineOptions({ name: 'Spinners' })

import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css'

import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-tomorrow.css'

const highlight1 = (code: string) => {
  return highlight(code, languages.js, 'js')
}

import './flower-spinner.css'
import './css-loader.css'
const code = ref(` html
<div class="flower-spinner">
  <div class="dots-container">
    <div class="bigger-dot">
      <div class="smaller-dot"></div>
    </div>
  </div>
</div>
css
`)

const code1 = ref(`
<div class="loader"></div>
`)
</script>

<template>
  <ContentWrap title="代码例子">
    <div class="flex">
      <ElCard style="max-width: 480px">
        <div class="flower-spinner">
          <div class="dots-container">
            <div class="bigger-dot">
              <div class="smaller-dot"></div>
            </div>
          </div>
        </div>
        <ElLink target="_blank" href="https://epic-spinners.epicmax.co">
          https://epic-spinners.epicmax.co
        </ElLink>
        <template #footer>
          <PrismEditor class="my-editor" v-model="code" :highlight="highlight1" line-numbers />
        </template>
      </ElCard>
      <ElCard style="max-width: 480px; margin-left: 20px">
        <div class="loader"></div>
        <ElLink target="_blank" href="https://css-loaders.com/spinner/">
          https://css-loaders.com/spinner/
        </ElLink>
        <template #footer>
          <PrismEditor class="my-editor" v-model="code1" :highlight="highlight1" line-numbers />
        </template>
      </ElCard>
    </div>
  </ContentWrap>
</template>
<style scoped>
/* required class */
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
  color: #ccc;

  /* you must provide font-family font-size line-height. Example: */
  font-family:
    Fira code,
    Fira Mono,
    Consolas,
    Menlo,
    Courier,
    monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}
</style>
