# Icon 图标

语义化的矢量图形。图标是在一个单独的 npm 包中，如果你想使用图标，需要先安装 @qnet-icons/react 图标组件包：

```bash
$ npm install --save @qnet-icons/react
# or
$ yarn add @qnet-icons/react
# or
$ pnpm add @qnet-icons/react
```

然后从这个包中引入你所需要的图标即可：

```js
import { CodeOutline } from '@qnet-icons/react';
```

由于主流的构建工具会自动做 Tree-Shaking，所以最终被打包进来的只有你用到的那些图标，不必担心包体积问题。

## 使用示例

<code src="./demo-single.tsx"></code>

### 属性

支持所有 SVG 属性，详情见 [SVG Attribute](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute) 下面是几个常用属性：

| 属性   | 说明       | 类型     | 默认值          |
| ------ | ---------- | -------- | --------------- |
| color  | 图标的颜色 | `string` | `'transparent'` |
| width  | 图标的宽度 | `number` | `24`            |
| height | 图标的高度 | `number` | `24`            |

### 关于 SVG 图标

我们使用了 SVG 图标，从而带来了以下优势：

- 完全离线化使用，不需要从 CDN 下载字体文件，图标不会因为网络问题呈现方块，也无需字体文件本地部署。

- 在低端设备上 SVG 有更好的清晰度。

- 对于内建图标的更换可以提供更多 API，而不需要进行样式覆盖。

## 图标列表

<code src="./demo-all.tsx" inline="true"></code>
