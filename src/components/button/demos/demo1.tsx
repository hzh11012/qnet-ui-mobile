import React from 'react';
import { Button, Space } from 'qnet-ui-mobile';
import { DemoBlock } from 'demos';

const Demo1 = () => {
  return (
    <>
      <DemoBlock title="不同颜色的按钮">
        <Space wrap>
          <Button
            onClick={() => {
              alert('Hello World !');
            }}
          >
            Default
          </Button>
          <Button type="primary">Primary</Button>
          <Button type="success">Success</Button>
          <Button type="danger">Danger</Button>
          <Button type="warning">Warning</Button>
        </Space>
      </DemoBlock>

      <DemoBlock title="块级按钮">
        <Button block type="primary" size="large">
          Block Button
        </Button>
      </DemoBlock>

      <DemoBlock title="填充模式">
        <Space wrap>
          <Button type="primary" fill="filled">
            Filled
          </Button>
          <Button type="primary" fill="outline">
            Outline
          </Button>
          <Button type="primary" fill="none">
            None
          </Button>
        </Space>
      </DemoBlock>

      <DemoBlock title="不同大小的按钮">
        <Space wrap align="center">
          <Button type="primary" size="mini">
            Mini
          </Button>
          <Button type="primary" size="small">
            Small
          </Button>
          <Button type="primary" size="middle">
            Middle
          </Button>
          <Button type="primary" size="large">
            Large
          </Button>
        </Space>
      </DemoBlock>
    </>
  );
};

export default Demo1;
