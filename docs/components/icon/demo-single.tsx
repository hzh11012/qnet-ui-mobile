import React from 'react';
import { WifiOutline, WindowsOutline } from '@qnet-icons/react';
import { DemoBlock } from 'demos';
import { Space } from 'qnet-ui-mobile';

const demo1 = () => {
  return (
    <>
      <DemoBlock title="基础用法">
        <Space wrap style={{ fontSize: 36 }}>
          <WifiOutline />
          <WindowsOutline />
        </Space>
      </DemoBlock>
      <DemoBlock title="大小">
        <Space wrap align="center">
          <WifiOutline width={12} height={12} />
          <WifiOutline width={24} height={24} />
          <WifiOutline width={36} height={36} />
          <WifiOutline width={48} height={48} />
        </Space>
      </DemoBlock>
      <DemoBlock title="颜色">
        <Space wrap style={{ fontSize: 36 }}>
          <WifiOutline color="#76c6b8" />
          <WifiOutline color="var(--qnet-color-primary)" />
          <WifiOutline color="var(--qnet-color-weak)" />
          <WifiOutline color="var(--qnet-color-danger)" />
        </Space>
      </DemoBlock>
    </>
  );
};
export default demo1;
