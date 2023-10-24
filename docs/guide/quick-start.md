# 快速上手

## 安装

```bash
$ npm install --save qnet-ui-mobile
# or
$ yarn add qnet-ui-mobile
# or
$ pnpm add qnet-ui-mobile
```

## 引入

直接引入组件即可，qnet-ui-mobile 会自动为你加载 css 样式文件：

```js
import { Button } from 'qnet-ui-mobile';
```

## 兼容性

我们建议在项目中增加下面的 babel 配置，这样可以达到最大兼容性，为 iOS Safari `>= 10` 和 Chrome `>= 49`：

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "chrome": "49",
          "ios": "10"
        }
      }
    ]
  ]
}
```

<Alert type="warning">
  不要把 node_modules 排除在 babel 编译之外，不然上面的配置不会有效果
</Alert>

## 在线体验

如果你不想在本地配置环境，也可以直接在 [codesandbox](https://codesandbox.io/s/qnet-ui-mobile-v0410d?file=/src/App.js) 上进行体验。
