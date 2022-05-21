import React from 'react';
import { Divider, Button } from 'qnet-ui-mobile';
import { DemoBlock } from 'demos';

const Demo1 = () => {
  return (
    <>
      <DemoBlock title="基础分割线">
        <Divider />
      </DemoBlock>

      <DemoBlock title="带内容的分割线">
        <Divider>默认内容</Divider>
        <Divider position="left">左侧内容</Divider>
        <Divider position="right">右侧内容</Divider>
      </DemoBlock>

      <DemoBlock title="竖向分割线">
        <>
          Text
          <Divider direction="vertical" />
          <a href="https://qnets.cn/" target="_blank" rel="noreferrer">
            Link
          </a>
          <Divider direction="vertical" />
          <Button type="success">Button</Button>
        </>
      </DemoBlock>

      <DemoBlock title="自定义样式">
        <Divider
          className="testClass"
          style={{
            color: '#ff3141',
            borderColor: '#ff3141',
            borderStyle: 'dotted'
          }}
        >
          自定义样式
        </Divider>
      </DemoBlock>
    </>
  );
};

export default Demo1;
