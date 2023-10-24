# FAQ

### 支持小程序吗？

qnet-ui-mobile 本身只支持 React 技术栈。

微信和其他平台的小程序暂时还没有对应的孪生组件库，欢迎社区同学开发。

### 支持 React Native 吗？

不支持。

### 如何避免 300ms 的点击延迟？

在 `head` 中增加以下内容：

```html
<meta name="viewport" content="width=device-width" />
```

或者增加以下全局样式：

```css
html {
  touch-action: manipulation;
}
```

具体请参考这两篇文章：

- [300ms tap delay, gone away](https://developers.google.com/web/updates/2013/12/300ms-tap-delay-gone-away)
- [More Responsive Tapping on iOS](https://webkit.org/blog/5610/more-responsive-tapping-on-ios/)

### 文档 demo 中出现的 `import xxx from 'demos'` 是什么？

`demos` 并不是一个 npm 包，而是 qnet-ui-mobile 项目中创建的一个别名。它的实现在[这里](https://github.com/hzh11012/qnet-ui-mobile/blob/master/src/demos/index.ts)。

请不要尝试 `npm install demos`。你可以直接忽略它们。

### qnet-ui-mobile 有 CDN 上的 umd 包吗？

有的，具体用法请参考[这篇文档](/guide/pre-built-bundles)。
