import React from 'react';
import { Alert } from 'qnet-ui-mobile';
import { DemoBlock } from 'demos';

const Demo1 = () => {
  return (
    <>
      <DemoBlock title="不同颜色的提示">
        <Alert kind="warning">这是一条警告提示</Alert>
      </DemoBlock>
    </>
  );
};
export default Demo1;
