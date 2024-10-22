export const data = [
  {
    type: 'javaScript',
    activeNames: [],
    list: [
      {
        title: '递归求和',
        code: `  递归求和
      let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      function fn(i){
        return i >= nums.length ? 0: nums[i] + fn(i + 1)
      }
    
      console.log(fn(0));
    `
      },
      {
        title: '加法运算法则',
        code: `  加法运算法则
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
    `
      },
      {
        title: '对象属性次序',
        code: `  对象属性次序
      const obj = {
        'a': '1',
        'b': '2',
        1: '3',
        2: '4'
      }
    
      console.log(Object.keys(obj));
    `
      },
      {
        title: '找单身狗',
        code: `  找单身狗
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
    `
      },
      {
        title: '属性类型',
        code: `  属性类型
    对象属性类型只能是字符串和symbol
    let a = {};
    b = { key: 'b'};
    c = { key: 'c'};
    a[b] = 123;
    a[c] = 456
    
    console.log(a[b]);
    `
      },
      {
        title: '分时函数',
        code: `
      const chunkArray = (array, process, count) => {
      let obj, t
      let start = function () {
        for (let i = 0; i < Math.min(count, array.length); i++) {
          let obj = array.shift()
          process(obj)
        }
      }
    
      return function () {
        t = setInterval(function () {
          if (array.length === 0) {
            return clearInterval(t)
          }
    
          start()
        }, 200)
      }
    }
    
    // 使用示例
    const largeArray = new Array(10000).fill(null).map((_, index) => index)
    
    chunkArray(
      largeArray,
      (item, index) => {
        console.log(item)
      },
      1000
    )()
        `
      },
      {
        title: '属性类型',
        code: `  属性类型
    对象属性类型只能是字符串和symbol
    let a = {};
    b = { key: 'b'};
    c = { key: 'c'};
    a[b] = 123;
    a[c] = 456
    
    console.log(a[b]);
    `
      }
    ]
  },
  {
    type: 'html',
    activeNames: [],
    list: [
      {
        title: '递归求和',
        code: `  递归求和
      let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      function fn(i){
        return i >= nums.length ? 0: nums[i] + fn(i + 1)
      }
    
      console.log(fn(0));
    `
      }
    ]
  }
]
