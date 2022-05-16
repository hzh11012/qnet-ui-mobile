import React from 'react';
import { Loading, Space } from 'qnet-ui-mobile';
import { DemoBlock } from 'demos';

const Demo1 = () => {
  return (
    <>
      <DemoBlock title="不同类型的加载">
        <Space style={{ '--gap': '24px' }}>
          <Loading />
          <Loading type="circle" />
          <Loading type="dot" />
        </Space>
      </DemoBlock>
      <DemoBlock title="自定义颜色">
        <Space style={{ '--gap': '24px' }}>
          <Loading color="#1677ff" />
          <Loading color="#ff3141" />
          <Loading type="circle" color="#00b578" />
          <Loading type="dot" color="#ff8f1f" />
        </Space>
      </DemoBlock>
      <DemoBlock title="自定义大小">
        <Space style={{ '--gap': '24px' }}>
          <Loading size={24} />
          <Loading size={36} />
          <Loading size={48} />
        </Space>
      </DemoBlock>
      <DemoBlock title="文字排列方式">
        <Space style={{ '--gap': '24px' }}>
          <Loading>加载中</Loading>
          <Loading type="circle" vertical>
            加载中
          </Loading>
        </Space>
      </DemoBlock>
      <DemoBlock title="自定义文字颜色">
        <Space style={{ '--gap': '24px' }}>
          <Loading type="circle" textColor="#ff3141">
            加载中
          </Loading>
          <Loading type="dot" textColor="#999" vertical>
            加载中
          </Loading>
        </Space>
      </DemoBlock>

      <DemoBlock title="自定义文字大小">
        <Space style={{ '--gap': '24px' }}>
          <Loading textSize={18} textColor="#999">
            加载中
          </Loading>
          <Loading type="circle" textSize={22} textColor="#999" vertical>
            加载中
          </Loading>
        </Space>
      </DemoBlock>
    </>
  );
};
export default Demo1;
