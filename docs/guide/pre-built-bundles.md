# 预构建产物

qnet-ui-mobile 提供了一套预构建的产物，包括两部分：

js 资源：

```text
/lib/bundle/qnet-ui-mobile.cjs.development.js
/lib/bundle/qnet-ui-mobile.es.development.js
/lib/bundle/qnet-ui-mobile.umd.development.js
```

上述带有 `.development` 的产物仅适用于开发环境，不适合用于生产环境。压缩优化后可用于生产环境的产物如下：

```text
/lib/bundle/qnet-ui-mobile.cjs.js
/lib/bundle/qnet-ui-mobile.es.js
/lib/bundle/qnet-ui-mobile.umd.js
```

css 资源：

```text
/lib/bundle/style.css
```

这些预构建的 js 文件中是不包含 css 内容的，因此通常情况下，你需要选择性地引入某一个版本的 js 资源（例如 `/lib/bundle/qnet-ui-mobile.umd.js`），然后再额外引入 `/lib/bundle/style.css`。

你可以在 [jsdelivr](https://www.jsdelivr.com/package/npm/qnet-ui-mobile?path=bundle) 上找到这些文件。
