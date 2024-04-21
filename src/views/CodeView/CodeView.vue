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
  function fn(i){
    return i >= nums.length ? 0: nums[i] + fn(i + 1)
  }

  console.log(fn(0));
`)

const code2 = ref(`  加法运算法则
  1. 如果都是原始类型--有字符串直接拼接，没有字符串转为数字相加(含有NaN返回NaN)
  2. 如果是引用类型--调用valueof()--调用toString()--报错

  1 + 1 = 2
  '1' + 1 = '11'
  NaN + 1 = NaN
  NaN + '1' = 'NaN1'
  null + 1 = 1
  null + '1' = 'null1'
  [1] + 1 = '11'
  [1,2] + [1] = '1,21'
  [1] + {n: 1} = '1[object Object]'
  null + undefined = 'NaN'
  NaN + '1' = 'NaN1'
`)

const code3 = ref(`  对象属性次序
  const obj = {
    'a': '1',
    'b': '2',
    1: '3',
    2: '4'
  }

  console.log(Object.keys(obj));
`)

const code4 = ref(`  找单身狗
nums 数组中包含1个或多个正整数
其他数字都出现两次，只有一个数字只出现1次
找出只出现1次的数字
function uniqueNumber(nums){
  let result = 0
  for(let i = 0; i< nums.length; i++){
    result = result ^ nums[i]
  }

  return result

}
`)

const code5 = ref(`  属性类型
对象属性类型只能是字符串和symbol
let a = {};
b = { key: 'b'};
c = { key: 'c'};
a[b] = 123;
a[c] = 456

console.log(a[b]);
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
    <p>2. 加法运算法则</p>
    <PrismEditor 
      class="my-editor" 
      :readonly="true" 
      v-model="code2" 
      :highlight="highlight1"
      line-numbers>
    </PrismEditor>
    <p>3. 对象属性次序</p>
    <PrismEditor 
      class="my-editor" 
      :readonly="true" 
      v-model="code3" 
      :highlight="highlight1"
      line-numbers>
    </PrismEditor>
    <p>4. 找单身狗</p>
    <PrismEditor 
      class="my-editor" 
      :readonly="true" 
      v-model="code4" 
      :highlight="highlight1"
      line-numbers>
    </PrismEditor>
    <p>5. 属性类型</p>
    <PrismEditor 
      class="my-editor" 
      :readonly="true" 
      v-model="code5" 
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
