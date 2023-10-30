import React from 'react';
import { WaterMark } from 'qnet-ui-mobile';
import { DemoBlock, DemoDescription } from 'demos';

const Demo1 = () => {
  return (
    <DemoBlock title="全屏水印">
      <DemoDescription content="把 WaterMark 放到一个 relative 定位的父元素，它会自动撑满这个父元素的范围。" />
      <WaterMark
        textColor={'rgba(120, 100, 50, .25)'}
        text={['Qnet UI', 'Qnet UI Mobile']}
        rotate={10}
      />
    </DemoBlock>
  );
};

export default Demo1;
