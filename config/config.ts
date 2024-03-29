import { components } from './components';
import { IConfig } from 'dumi';

const config: IConfig = {
  mode: 'site',
  title: 'Qnet UI Mobile',
  logo: 'https://cdn.qnets.cn/ziran.png',
  favicon: 'https://cdn.qnets.cn/ziran.png',
  navs: [
    {
      title: '指南',
      path: '/guide'
    },
    {
      title: '组件',
      path: '/components'
    },
    {
      title: 'GitHub',
      path: 'https://github.com/hzh11012/qnet-ui-mobile'
    }
  ],
  locales: [['zh', '中文']],
  menus: {
    '/': [
      {
        title: '首页',
        path: 'index'
      }
    ],
    '/guide': [
      {
        title: '快速上手',
        path: '/guide/quick-start'
      },
      {
        title: '常见问题',
        path: '/guide/faq'
      },
      {
        title: 'CSS 变量',
        path: '/guide/css-variables'
      },
      {
        title: '主题',
        path: '/guide/theming'
      },
      {
        title: '深色模式',
        path: '/guide/dark-mode'
      },
      {
        title: '按需加载',
        path: '/guide/import-on-demand'
      },
      {
        title: '预构建产物',
        path: '/guide/pre-built-bundles'
      }
    ],
    '/components': [
      {
        title: '基础',
        children: components.basic
      },
      {
        title: '反馈',
        children: components.feedback
      }
    ]
  },
  resolve: {
    includes: ['docs', 'src'],
    passivePreview: true
  },
  alias: {
    'qnet-ui-mobile/es': process.cwd() + '/src',
    demos: process.cwd() + '/src/demos/index.ts'
  },
  metas: [
    {
      name: 'viewport',
      content:
        'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover'
    },
    {
      name: 'keywords',
      content: 'qnet-ui-mobile, qnet ui mobile, React mobile components'
    }
  ],
  hash: true,
  scripts: [
    `if (location.pathname.startsWith('/~demos/')) {
      document.body.style.background = '#FAFBFC'
    }`,
    `
    if (!location.port) {
      // Enable Google Analytics
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', 'UA-72788897-2');
    }
    `,
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=UA-72788897-2',
      async: true
    }
  ],
  history: {
    type: 'hash'
  },
  fastRefresh: {},
  styles: [
    `
      html {
        touch-action: manipulation;
      }
      #root .__dumi-default-mobile-demo-layout {
        padding: 0;
      }
      a[title='站长统计'] {
        display: none;
      }
      html {
        min-height: 100vh;
      }
      .__dumi-default-layout-hero {
        background: url(https://cdn.qnets.cn/mobileBack.png) no-repeat 100% / cover !important;
      }`
  ],
  themeConfig: {
    hd: {
      rules: []
    }
  },
  plugins: ['./.dumi/plugin-gallery/index.ts', './.dumi/plugin-theme/index.ts']
};

export default config;
