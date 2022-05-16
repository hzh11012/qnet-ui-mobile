import React from 'react';
import { Button, Space, Loading } from 'qnet-ui-mobile';
import { AppleFilled } from '@qnet-icons/react';
import { DemoBlock, sleep } from 'demos';

const Demo2 = () => {
  return (
    <>
      <DemoBlock title="带图标的按钮">
        <Button>
          <Space>
            <AppleFilled width={18} height={18} />
            <span>搜索</span>
          </Space>
        </Button>
      </DemoBlock>

      <DemoBlock title="禁用状态">
        <Space wrap>
          <Button disabled>Disabled</Button>
          <Button type="primary" disabled>
            Disabled
          </Button>
        </Space>
      </DemoBlock>

      <DemoBlock title="加载状态">
        <Space wrap>
          <Button type="primary" loading={true} loadingText="正在加载">
            Loading
          </Button>
          <Button
            loading={true}
            loadingIcon={<Loading type="circle" size={20} />}
          >
            Loading
          </Button>
          <Button
            loading={true}
            loadingIcon={
              <Loading type="dot" vertical size={20} color="#333">
                加载文案
              </Loading>
            }
          >
            Loading
          </Button>
          <Button
            loading="auto"
            loadingText="正在加载"
            onClick={async () => {
              await sleep(2000);
            }}
          >
            Auto Loading
          </Button>
        </Space>
      </DemoBlock>

      <DemoBlock title="不同类型圆角">
        <Space wrap>
          <Button type="primary" shape="default">
            Default
          </Button>
          <Button type="primary" shape="round">
            Round
          </Button>
          <Button type="primary" shape="square">
            Square
          </Button>
        </Space>
      </DemoBlock>

      <DemoBlock title="打开链接">
        <Space wrap>
          <Button type="primary" url="https://qnets.cn">
            Default
          </Button>
          <Button type="primary" url="https://qnets.cn" target={false}>
            Target False
          </Button>
        </Space>
      </DemoBlock>
    </>
  );
};

export default Demo2;
