<script setup lang="ts">
import { ref } from 'vue'
import { ContentWrap } from '@/components/ContentWrap'

import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css'

import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-tomorrow.css'
import { ElCollapse, ElCollapseItem, ElTabPane, ElTabs } from 'element-plus'

import { data } from './data'

const highlight1 = (code: string) => {
  return highlight(code, languages.js, 'js')
}

const activeName = ref('javaScript')
</script>

<template>
  <ContentWrap title="代码例子">
    <ElTabs v-model="activeName">
      <ElTabPane v-for="item in data" :key="item.type" :label="item.type" :name="item.type">
        <ElCollapse v-model="item.activeNames">
          <template v-for="(datum, index) in item.list" :key="datum">
            <ElCollapseItem :title="index + 1 + '.' + datum.title" :name="index + 1">
              <PrismEditor
                class="my-editor"
                :readonly="true"
                v-model="datum.code"
                :highlight="highlight1"
                line-numbers
              />
            </ElCollapseItem>
          </template>
        </ElCollapse>
      </ElTabPane>
    </ElTabs>
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
