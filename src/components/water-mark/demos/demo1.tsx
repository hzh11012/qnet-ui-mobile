import React from 'react';
import { WaterMark } from 'qnet-ui-mobile';
import { DemoBlock, DemoDescription } from 'demos';

const divProps: { [propName: string]: string } = {
  position: 'relative',
  width: '100%',
  height: '150px'
};

const Demo1 = () => {
  return (
    <>
      <DemoBlock title="普通水印">
        <div style={divProps}>
          <DemoDescription content="把 WaterMark 放到一个 relative 定位的父元素，它会自动撑满这个父元素的范围。" />
          <WaterMark
            width={140}
            textColor={'rgba(0, 0, 0, .25)'}
            rotate={30}
            height={80}
            text="Qnet UI Mobile"
            fullPage={false}
          />
        </div>
      </DemoBlock>

      <DemoBlock title="多行文字水印">
        <div style={divProps}>
          <DemoDescription content="把 WaterMark 放到一个 relative 定位的父元素，它会自动撑满这个父元素的范围。" />
          <WaterMark
            textColor={'rgba(0, 100, 0, .25)'}
            text={['Qnet UI', 'Qnet UI Mobile']}
            fullPage={false}
          />
        </div>
      </DemoBlock>

      <DemoBlock title="图片水印">
        <div style={divProps}>
          <DemoDescription content="把 WaterMark 放到一个 relative 定位的父元素，它会自动撑满这个父元素的范围。" />
          <WaterMark
            image={'https://cdn.qnets.cn/mobileBack.png'}
            imageWidth={80}
            height={60}
            fullPage={false}
          />
        </div>
      </DemoBlock>
    </>
  );
};

export default Demo1;
