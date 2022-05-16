import { components } from './components';
import { IConfig } from 'dumi';

const config: IConfig = {
  mode: 'site',
  title: 'Qnet UI Mobile',
  logo: 'https://ftp.qnets.cn/qnetui/ziran.png',
  favicon: 'https://ftp.qnets.cn/qnetui/ziran.png',
  navs: [
    {
      title: '指南',
      path: '/guide'
    },
    {
      title: '组件',
      path: '/components'
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
        title: '按需加载',
        path: '/guide/import-on-demand'
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
        background: url(https://ftp.qnets.cn/qnetui/bg.png) no-repeat 100% / cover !important;
      }`
  ],
  themeConfig: {
    hd: {
      rules: []
    }
  },
  plugins: ['./.dumi/plugin-gallery/index.ts']
};

export default config;
