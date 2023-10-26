import React from 'react';
import styles from './home-page.less';

const home = () => {
  const characteristics = [
    {
      img: 'https://gw.alipayobjects.com/zos/bmw-prod/dd5520d8-44b4-43a6-88ee-c970e3757d39.svg',
      title: '高性能',
      txt: '无需配置，即可拥有最佳的包体积大小和最优的性能'
    },
    {
      img: 'https://gw.alipayobjects.com/zos/bmw-prod/33cb2ea7-3025-439a-9ce1-212aae26b1cc.svg',
      title: '可定制',
      txt: '基于 CSS 变量，可以灵活地调整组件外观或自由创造自己的主题'
    },
    {
      img: 'https://gw.alipayobjects.com/zos/bmw-prod/7329c998-6dfd-4764-865a-1839dbcc5653.svg',
      title: '原子化',
      txt: '每个组件提供的功能，恰到好处地满足业务所需'
    },
    {
      img: 'https://gw.alipayobjects.com/zos/bmw-prod/0c1d3f71-9b1a-43df-84a8-8eed55700d65.svg',
      title: '流畅',
      txt: '拥有流畅的手势交互和细致的动画展示，助力打造极致体验'
    }
  ];

  return (
    <div className={styles.homePage}>
      {/* 内容部分 */}
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>Qnet UI Mobile</h1>
            <p className={styles.description}>
              基于 React 实现的精致移动端组件库
            </p>
            <p className={styles.buttons}>
              <a href="#/guide/quick-start">快速上手</a>
              <a href="#/components">组件列表</a>
            </p>
          </div>
          <img
            className={styles.headerImage}
            alt="header-img"
            src="https://ftp.qnets.cn/qnetui/mobileBack.png"
          />
        </div>
        {/* 功能特性 */}
        <div className={styles.group}>
          <p className={styles.groupTitle}>功能特性</p>
          <ul className={styles.features}>
            {characteristics.map(item => {
              return (
                <li key={item.title}>
                  <p>
                    <img src={item.img} alt="" />
                  </p>
                  <p>{item.title}</p>
                  <p>{item.txt}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {/* 底部导航 */}
      <div className={styles.footer}>
        <div className={styles.copyright}>
          Copyright © {new Date().getFullYear()}{' '}
          <a href="https://qnets.cn" target="_blank" rel="noreferrer">
            qnets.cn
          </a>
          {' | '}
          Powered by{' '}
          <a href="http://d.umijs.org" target="_blank" rel="noreferrer">
            dumi
          </a>
        </div>
      </div>
    </div>
  );
};

export default home;
