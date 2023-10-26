# 主题

得益于 CSS 变量强大而灵活的能力，自定义一套 qnet-ui-mobile 的主题是非常简单的，你不需要配置任何编译工具，也不需要安装额外的插件，直接修在 `:root` 覆盖 CSS 变量就可以了：

```css
:root:root {
  --qnet-color-primary: #e4dfd7;
}
```

> 注：为什么要写两个重复的 `:root`？
>
> 由于 qnet-ui-mobile 中的主题变量也是在 `:root` 下声明的，所以在有些情况下会由于优先级的问题无法成功覆盖。通过 `:root:root` 可以显式地让你所写内容的优先级更高一些，从而确保主题变量的成功覆盖。

当然如果你只是希望对局部的主题进行调整，也可以把上面的 CSS 变量覆盖逻辑加在任何一个你想调整的节点上，例如：

```css
.gray-theme {
  --qnet-color-primary: #e4dfd7;
}
```

```jsx
<div className="gray-theme">
  <Button type="primary">Gray</Button>
</div>
```

可以得到这样的一个按钮：

```jsx | preview
/**
 * inline: true
 */

import React from 'react';
import { Button } from 'qnet-ui-mobile';

export default () => {
  return (
    <div
      style={{
        ['--qnet-color-primary']: '#e4dfd7'
      }}
    >
      <Button type="primary">Gray</Button>
    </div>
  );
};
```

以下是 qnet-ui-mobile 目前提供的全局性 CSS 变量：

```css
:root {
  --qnet-color-primary: #1677ff;
  --qnet-color-success: #00b578;
  --qnet-color-warning: #ff8f1f;
  --qnet-color-danger: #ff3141;
  --qnet-color-white: #ffffff;
  --qnet-color-box: #f5f5f5;
  --qnet-color-weak: #999999;
  --qnet-color-light: #cccccc;
  --qnet-border-color: #e8e9eb;
  --qnet-font-size-main: var(--qnet-font-size-6);
  --qnet-color-text: #333333;
  --qnet-color-text-secondary: #666666;
  --qnet-color-background: #ffffff;
  --qnet-color-fill-content: var(--qnet-color-box);

  --qnet-font-family: -apple-system, blinkmacsystemfont, 'Helvetica Neue',
    helvetica, segoe ui, arial, roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB',
    'Microsoft Yahei', sans-serif;
}
```

此外，每个组件也有自己对应的 CSS 全局变量，你可以在它们的文档页面中找到，具体请参阅 [CSS 变量](/guide/css-variables) 章节。
