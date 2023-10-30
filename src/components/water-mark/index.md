# WaterMark 水印

<code src="./demos/demo1.tsx"></code>

<code src="./demos/demo2.tsx"></code>

### 属性

| 参数        | 说明                           | 类型                 | 默认值 |
| ----------- | ------------------------------ | -------------------- | ------ |
| text        | 水印文字内容                   | `string \| string[]` | -      |
| width       | 单个水印的宽度                 | `number`             | `120`  |
| height      | 单个水印的高度                 | `number`             | `64`   |
| textColor   | 水印文字颜色                   | `string`             | `#000` |
| textSize    | 文字大小                       | `string \| number`   | `14`   |
| zIndex      | 追加的水印元素的 z-index       | `number`             | `2000` |
| gapX        | 水印之间的水平间距             | `number`             | `24`   |
| gapY        | 水印之间的垂直间距             | `number`             | `48`   |
| image       | 图片源，优先使用图片渲染水印   | `string`             | -      |
| imageWidth  | 图片宽度                       | `number`             | `120`  |
| imageHeight | 图片高度                       | `number`             | `64`   |
| rotate      | 水印绘制时，旋转的角度，单位 ° | `number`             | `-22`  |
| fullPage    | 是否覆盖整个页面               | `boolean`            | `true` |
| monitor     | 是否开启监视模式               | `boolean`            | `true` |
