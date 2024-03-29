# vue-skeleton
基于Vue的骨架屏实现

# 使用方法
```javascript
  import Skeleton from './index.js'
  Vue.component(Skeleton.name, Skeleton)
```

```html
  <template>
    <gm-skeleton>
      <Component />
      <div></div>
      <p><span></span></p>
    </gm-skeleton>
  </template>
```

```css
  .gm-skeleton {
    background-image: linear-gradient(90deg,#f2f2f2 25%,#e6e6e6 37%,#f2f2f2 63%) !important;
    background-color: transparent !important;
    background-size: 400% 100%;
    animation: skeleton-loading 1.5s ease-in infinite;
    min-height: .3rem;
    min-width: 1rem;
  }
  
  @keyframes skeleton-loading {
    from {
      background-position: 100% 50%;
    }
    to {
      background-position: 0 50%;
    }
  }
```

# Props
属性名 | 值 | 描述
-----  | ---- | ---
showSpin | Boolean | 判断是否显示骨架屏(默认为true)
skeletPrefix | String | 骨架屏ClassName(默认为gm-skeleton)
init | Boolean | 默认第一层的子元素不添加骨架屏名字，因为背景色一般都会设置在根元素上，所以这里不做骨架屏处理，默认为true

# 完整分析
[思路原理分析](https://juejin.cn/post/6943020826627145735)

# 个人微信
IAmFineThanksMartin

# 另附Vue2.x源码解析文档
https://gloomysunday28.github.io/vue-source/

# Vue2一键式升级Vue3的转译工具
https://github.com/Gloomysunday28/vue-ts2cfa

# 公众号: 前端马丁
<img src="./WechatIMG27.jpeg"/>
