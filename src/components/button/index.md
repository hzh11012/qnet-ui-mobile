# Button 按钮

<code src="./demos/demo1.tsx"></code>

<code src="./demos/demo2.tsx"></code>

### 属性

| 属性        | 说明                                                                                | 类型                                                                                | 默认值                  |
| ----------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------- |
| type        | 按钮的类型                                                                          | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'`                      | `'default'`             |
| size        | 大小                                                                                | `'mini' \| 'small' \| 'middle' \| 'large'`                                          | `'middle'`              |
| fill        | 填充模式                                                                            | `'filled' \| 'outline' \| 'none'`                                                   | `'filled'`              |
| block       | 是否是块级元素                                                                      | `boolean`                                                                           | `false`                 |
| disabled    | 是否禁用                                                                            | `boolean`                                                                           | `false`                 |
| loading     | 是否处于加载状态，`'auto'` 模式会监听 `onClick` 的 `Promise` 状态自动更新 `loading` | `boolean \| 'auto'`                                                                 | `false`                 |
| loadingText | 加载状态下额外展示的文字                                                            | `string`                                                                            | -                       |
| loadingIcon | 加载状态下的 `icon` 图标                                                            | `ReactNode`                                                                         | `<Loading size={20} />` |
| nativeType  | 原生 `button` 元素的 `type` 属性                                                    | `'submit' \| 'reset' \| 'button'`                                                   | `'button'`              |
| shape       | 按钮的形状                                                                          | `'default' \| 'round' \| 'square'`                                                  | `'default'`             |
| url         | 跳转链接                                                                            | `string`                                                                            | -                       |
| target      | 是否新页面打开链接                                                                  | `boolean`                                                                           | `true`                  |
| onClick     | 点击事件                                                                            | `(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void \| Promise<void>` | -                       |

### CSS 变量

| 属性               | 说明     | 默认值                     | 全局变量                         |
| ------------------ | -------- | -------------------------- | -------------------------------- |
| --text-color       | 文字颜色 | `var(--qnet-color-text)`   | `--qnet-button-text-color`       |
| --background-color | 背景颜色 | `var(--qnet-color-white)`  | `--qnet-button-background-color` |
| --border-radius    | 圆角大小 | `4px`                      | `--qnet-button-border-radius`    |
| --border-width     | 边框宽度 | `1px`                      | `--qnet-button-border-width`     |
| --border-style     | 边框样式 | `solid`                    | `--qnet-button-border-style`     |
| --border-color     | 边框颜色 | `var(--qnet-border-color)` | `--qnet-button-border-color`     |
