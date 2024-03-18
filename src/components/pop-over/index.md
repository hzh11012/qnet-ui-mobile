# PopOver 气泡

<code src="./demos/demo1.tsx"></code>

### 属性

| 参数            | 说明                   | 类型                                                                                                                                                                 | 默认值                |
| --------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| placement       | 气泡位置               | `'top' \| 'top-start' \| 'top-end' \| 'right' \| 'right-start' \| 'right-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end'` | `'bottom'`            |
| stopPropagation | 阻止某些事件的冒泡     | `PropagationEvent[]`                                                                                                                                                 | `['click']`           |
| getContainer    | 浮层渲染父节点         | `HTMLElement \| () => HTMLElement`                                                                                                                                   | `() => document.body` |
| destroyOnHide   | 隐藏时，是否销气泡内容 | `boolean`                                                                                                                                                            | `false`               |
| content         | 气泡内容               | `React.ReactNode`                                                                                                                                                    | -                     |
| children        | 触发`Popover`的元素    | `React.ReactNode`                                                                                                                                                    | -                     |
| targetClassName | `children`外层元素类名 | `string`                                                                                                                                                             | -                     |

### CSS 变量

| 属性         | 说明             | 默认值 | 全局变量                 |
| ------------ | ---------------- | ------ | ------------------------ |
| --z-index    | 元素的 `z-index` | `1000` | `--qnet-popover-z-index` |
| --arrow-size | 元素的箭头尺寸   | `8px`  | -                        |
