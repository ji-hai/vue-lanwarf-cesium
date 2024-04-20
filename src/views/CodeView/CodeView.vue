<script setup lang="ts">
import { ref } from 'vue'
import { ContentWrap } from '@/components/ContentWrap'

import {PrismEditor} from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css'

import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';

const code1 = ref(`  递归求和
  let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  function sum(nums){
    let sumIndex = 0
    
    if(nums.length === 0) return 0
  }
`)

const highlight1 = (code: string) => {
  return highlight(code, languages.js, 'js'); 
}
</script>

<template>
  <ContentWrap title="代码例子">
    <p>1. 递归求和</p>
    <PrismEditor 
      class="my-editor" 
      :readonly="true" 
      v-model="code1" 
      :highlight="highlight1"
      line-numbers>
    </PrismEditor>
  </ContentWrap>
</template>
<style scoped>
 /* required class */
 .my-editor {
    /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
    background: #2d2d2d;
    color: #ccc;

    /* you must provide font-family font-size line-height. Example: */
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
  }

  /* optional class for removing the outline */
  .prism-editor__textarea:focus {
    outline: none;
  }
</style>
