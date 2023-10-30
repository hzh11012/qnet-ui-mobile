import React, { useEffect, useRef, useMemo, useState, FC } from 'react';
import type { CSSProperties } from 'react';
import {
  NativeProps,
  withNativeProps,
  mergeProps,
  getUUID,
  useMutationObserverRef
} from '../../utils';
import t from 'prop-types';
import ReactDOM from 'react-dom';

export type WaterMarkProps = {
  // 单个水印的文本内容
  text?: string | string[];
  // 单个水印的宽度
  width?: number;
  // 单个水印的高度
  height?: number;
  // 水印颜色
  textColor?: string;
  // 水印文字大小
  textSize?: string | number;
  // 水印层级
  zIndex?: number;
  // 水印之间的水平间隔
  gapX?: number;
  // 水印之间的垂直间隔
  gapY?: number;
  // 图片源 如果与 text 同时传入，优先使用图片水印
  image?: string;
  // 图片宽度
  imageWidth?: number;
  // 图片高度
  imageHeight?: number;
  // 水印绘制时，旋转的角度，单位 °
  rotate?: number;
  // 是否覆盖整个页面
  fullPage?: boolean;
  // 是否开启监视模式
  monitor?: boolean;
} & NativeProps;

const defaultProps = {
  width: 120,
  height: 64,
  textColor: '#000',
  textSize: 14,
  zIndex: 2000,
  gapX: 24,
  gapY: 48,
  imageWidth: 120,
  imageHeight: 64,
  rotate: -22,
  fullPage: true,
  monitor: true,
  textStyle: 'normal',
  textWeight: 'normal',
  textFamily: 'sans-serif'
};

const WATERMARK_DEFAULT_STYLES: CSSProperties = {
  position: 'absolute',
  zIndex: 2000,
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  backgroundRepeat: 'repeat'
};

const MUTATION_OBSERVER_CONFIG = {
  childList: true,
  subtree: true,
  attributeFilter: ['class', 'style', 'data-qnet-water-mark'],
  attributeOldValue: true
};

const WaterMark: FC<WaterMarkProps> = props => {
  const newProps = mergeProps(defaultProps, props);
  const {
    zIndex,
    image,
    text,
    textColor,
    textSize,
    gapX,
    gapY,
    width,
    height,
    rotate,
    monitor,
    fullPage
  } = newProps;

  const uuid = useRef(getUUID());
  const watermarkRef = useRef<HTMLDivElement>(null);
  const [styles, setStyels] = useState<CSSProperties>(WATERMARK_DEFAULT_STYLES);

  const [, setNode] = useMutationObserverRef(
    (records: MutationRecord[], observer: MutationObserver) => {
      // 重置监听状态
      const reset = (target?: HTMLElement | Node | null, cb?: () => void) => {
        if (!target) return;
        observer.disconnect();
        cb?.();
        observer.observe(target, MUTATION_OBSERVER_CONFIG);
      };

      const compareUUID = (left: Node, right: Node) =>
        (left as HTMLElement)?.dataset?.watermark ===
        (right as HTMLElement)?.dataset?.watermark;

      const isContainNode = (nodes: NodeList, target: HTMLElement) =>
        nodes.length && Array.from(nodes).some(node => node.contains(target));

      records.forEach(record => {
        const { type, target, attributeName, addedNodes, removedNodes } =
          record;
        const source = watermarkRef.current;

        if (!source) return;

        console.log('type', type);

        // style 发生变化
        if (type === 'attributes' && target.contains(source)) {
          attributeName === 'class' && source?.removeAttribute('class');
          attributeName === 'style' && rerender();
          attributeName === 'data-qnet-water-mark' &&
            reset(watermarkRef.current?.parentNode, () =>
              source?.setAttribute('data-qnet-water-mark', String(uuid.current))
            );
        }

        // 篡改节点标签名
        if (type === 'childList' && addedNodes.length) {
          const element = Array.from(addedNodes).find(node =>
            compareUUID(node, source)
          );
          element && target.removeChild(element);
        }

        // 移除节点
        if (type === 'childList' && isContainNode(removedNodes, source)) {
          reset(target, () => {
            ReactDOM.unmountComponentAtNode(source);
            target.appendChild(source);
          });
        }
      });
    },
    MUTATION_OBSERVER_CONFIG
  );

  const rerender = async () => {
    const style: CSSProperties = { ...WATERMARK_DEFAULT_STYLES };
    try {
      const { url } = await createCanvas();
      if (!url) return;
      style.backgroundImage = `url(${url})`;
      style.backgroundSize = `${gapX + width}px`;
      setStyels(style);
      const element = watermarkRef.current?.parentElement || null;
      setNode(monitor ? element : null);
    } catch (error) {}
  };

  const createCanvas = async () => {
    const {
      gapX,
      gapY,
      width,
      height,
      image,
      text,
      rotate,
      imageWidth,
      imageHeight,
      textSize,
      textColor,
      textStyle,
      textWeight,
      textFamily
    } = newProps;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const ratio = window.devicePixelRatio;

    const canvasWidth = `${(gapX + width) * ratio}px`;
    const canvasHeight = `${(gapY + height) * ratio}px`;

    const markWidth = width * ratio;
    const markHeight = height * ratio;

    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);

    if (ctx) {
      if (image) {
        ctx.translate(markWidth / 2, markHeight / 2);
        ctx.rotate((Math.PI / 180) * Number(rotate));
        const img = await new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.referrerPolicy = 'no-referrer';
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error('图片加载失败'));
          img.src = image;
        });
        ctx.drawImage(
          img,
          (-imageWidth * ratio) / 2,
          (-imageHeight * ratio) / 2,
          imageWidth * ratio,
          imageHeight * ratio
        );
        ctx.restore();
        return { url: canvas.toDataURL() };
      } else if (text) {
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        // 文字绕中间旋转
        ctx.translate(markWidth / 2, markHeight / 2);
        ctx.rotate((Math.PI / 180) * Number(rotate));

        const markSize = Number(textSize) * ratio;
        ctx.font = `${textStyle} normal ${textWeight} ${markSize}px/${markHeight}px ${textFamily}`;
        ctx.fillStyle = textColor;
        if (Array.isArray(text)) {
          text.forEach((item: string, index: number) =>
            ctx.fillText(item, 0, index * markSize)
          );
        } else {
          ctx.fillText(text, 0, 0);
        }
        ctx.restore();

        return { url: canvas.toDataURL() };
      }
    } else {
      Promise.reject(new Error('当前环境不支持 Canvas'));
    }
    return Promise.reject(new Error('图片或文字选项缺失'));
  };

  useEffect(() => {
    rerender();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    gapX,
    gapY,
    rotate,
    width,
    height,
    image,
    text,
    textSize,
    textColor,
    zIndex
  ]);

  const style = useMemo(() => {
    const properties = {
      ...styles,
      zIndex: zIndex
    };

    if (fullPage) {
      properties.position = 'fixed';
    }

    const plainStyle = (style: CSSProperties) => {
      return Object.entries(style).reduce((acc, [name, value]) => {
        if (value === undefined || value === null) return acc;
        const key = name.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `${acc}${key}:${value};`;
      }, '');
    };

    // 监视模式写入样式到节点
    if (monitor && watermarkRef.current) {
      watermarkRef.current?.setAttribute('style', plainStyle(properties));
    }
    return properties;
  }, [zIndex, monitor, styles, fullPage]);

  return withNativeProps(
    newProps,
    <div ref={watermarkRef} data-qnet-water-mark={uuid.current} style={style} />
  );
};

WaterMark.propTypes = {
  text: t.oneOfType([t.string, t.array]),
  width: t.number,
  height: t.number,
  textColor: t.string,
  textSize: t.oneOfType([t.string, t.number]),
  zIndex: t.number,
  gapX: t.number,
  gapY: t.number,
  image: t.string,
  imageWidth: t.number,
  imageHeight: t.number,
  rotate: t.number,
  fullPage: t.bool,
  monitor: t.bool
};

export default WaterMark;
