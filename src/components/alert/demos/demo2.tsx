import React from 'react';
import { Alert } from 'qnet-ui-mobile';
import { DemoBlock } from 'demos';

const Demo2 = () => {
  return (
    <>
      <DemoBlock title="提示">
        <Alert kind="info">这是一条info提示</Alert>
      </DemoBlock>
    </>
  );
};
export default Demo2;
