import React from 'react';
import { PopOver, Button, Space } from 'qnet-ui-mobile';
import { DemoBlock } from 'demos';

const Demo1 = () => {
  const content = (
    <>
      Hello
      <br />
      World
    </>
  );

  return (
    <>
      <DemoBlock title="基础用法">
        <Space wrap>
          <PopOver content={content}>
            <Button type="primary">Click me</Button>
          </PopOver>
        </Space>
      </DemoBlock>

      <DemoBlock title="气泡位置">
        <Space block justify="center">
          <PopOver content={content} placement="top-start">
            <Button>TL</Button>
          </PopOver>

          <PopOver content={content} placement="top">
            <Button>Top</Button>
          </PopOver>

          <PopOver content={content} placement="top-end">
            <Button>TR</Button>
          </PopOver>
        </Space>

        <Space block justify="between">
          <Space block justify="between" direction="vertical">
            <PopOver content={content} placement="right-start">
              <Button>RT</Button>
            </PopOver>

            <PopOver content={content} placement="right">
              <Button>Right</Button>
            </PopOver>

            <PopOver content={content} placement="right-end">
              <Button>RB</Button>
            </PopOver>
          </Space>

          <Space block justify="between" direction="vertical">
            <PopOver content={content} placement="left-start">
              <Button>LT</Button>
            </PopOver>

            <PopOver content={content} placement="left">
              <Button>Left</Button>
            </PopOver>

            <PopOver content={content} placement="left-end">
              <Button>LB</Button>
            </PopOver>
          </Space>
        </Space>

        <Space block justify="center">
          <PopOver content={content} placement="bottom-start">
            <Button>BL</Button>
          </PopOver>

          <PopOver content={content} placement="bottom">
            <Button>Bottom</Button>
          </PopOver>

          <PopOver content={content} placement="bottom-end">
            <Button>BR</Button>
          </PopOver>
        </Space>
      </DemoBlock>
    </>
  );
};

export default Demo1;
