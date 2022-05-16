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
