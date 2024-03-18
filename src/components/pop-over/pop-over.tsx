import React, { memo, useEffect, useRef, useState } from 'react';
import type { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { useClickAway, useIsomorphicLayoutEffect } from 'ahooks';
import {
  mergeProps,
  NativeProps,
  withNativeProps,
  PropagationEvent,
  GetContainer,
  withStopPropagation,
  renderToContainer,
  useShouldRender
} from '../../utils';
import t from 'prop-types';
import {
  arrow,
  autoUpdate,
  computePosition,
  flip,
  hide,
  limitShift,
  offset,
  shift
} from '@floating-ui/react-dom';

const classPrefix = `qnet-pop-over`;

export type PopOverProps = {
  // 位置
  placement?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end';
  // 阻止冒泡的事件
  stopPropagation?: PropagationEvent[];
  // 挂载节点
  getContainer?: GetContainer;
  // 隐藏是否销毁
  destroyOnHide?: boolean;
  // 内容
  content: ReactNode;
  // 触发内容
  children: ReactNode;
  targetClassName?: string;
} & NativeProps<'--z-index' | '--arrow-size'>;

const defaultProps = {
  placement: 'top',
  stopPropagation: ['click'],
  trigger: 'hover',
  destroyOnHide: false,
  getContainer: () => document.body
};

const Arrow = memo<NativeProps>(props => {
  return withNativeProps(
    props,
    <svg viewBox="0 0 30 16">
      <g fill="currentColor">
        <path d="M0,0 L30,0 L18.07289,14.312538 C16.65863,16.009645 14.13637,16.238942 12.43926,14.824685 C12.25341,14.669808 12.08199,14.49839 11.92711,14.312538 L0,0 L0,0 Z" />
      </g>
    </svg>
  );
});

const PopOver: FC<PopOverProps> = props => {
  const newProps = mergeProps(defaultProps, props);
  const {
    children,
    targetClassName,
    trigger,
    className,
    destroyOnHide,
    placement,
    getContainer,
    stopPropagation
  } = newProps;

  const hangingRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [targetElement, setTargetElement] = useState<Element | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  // 悬浮面板
  const hanging = withStopPropagation(
    stopPropagation,
    withNativeProps(
      newProps,
      <div
        ref={hangingRef}
        className={classNames(className, classPrefix, {
          [`${classPrefix}-hidden`]: !visible
        })}
      >
        <div className={`${classPrefix}-arrow`} ref={arrowRef}>
          <Arrow className={`${classPrefix}-arrow-icon`} />
        </div>
        <div className={`${classPrefix}-wrapper`}>
          <div className={`${classPrefix}-content`}>{props.content}</div>
        </div>
      </div>
    )
  );

  const update = async () => {
    const target = targetRef.current;
    const hanging = hangingRef.current;
    const arrowElement = arrowRef.current;
    setTargetElement(target);
    if (!target || !hanging || !arrowElement) return;
    const {
      x,
      y,
      placement: realPlacement,
      middlewareData
    } = await computePosition(target, hanging, {
      placement,
      middleware: [
        offset(12),
        shift({
          padding: 4,
          crossAxis: false,
          limiter: limitShift()
        }),
        flip(),
        hide(),
        arrow({
          element: arrowElement,
          padding: 12
        })
      ]
    });
    Object.assign(hanging.style, {
      left: `${x}px`,
      top: `${y}px`
    });
    const side = realPlacement.split('-')[0] as string;
    const arrowSide = {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right'
    }[side] as string;
    const { x: arrowX, y: arrowY } = middlewareData.arrow ?? {};
    Object.assign(arrowElement.style, {
      left: arrowX != null ? `${arrowX}px` : '',
      top: arrowY != null ? `${arrowY}px` : '',
      right: '',
      bottom: '',
      [arrowSide]: 'calc(var(--arrow-size) * -1)'
    });
    const arrowRotate = {
      top: '0deg',
      bottom: '180deg',
      left: '270deg',
      right: '90deg'
    }[side] as string;
    arrowElement.style.setProperty('--arrow-icon-rotate', arrowRotate);
  };

  useIsomorphicLayoutEffect(() => {
    update();
  });

  useEffect(() => {
    if (!targetElement) return;
    if (!trigger) return;

    const handleClick = () => {
      setVisible(v => !v);
    };
    targetElement.addEventListener('click', handleClick);
    return () => {
      targetElement.removeEventListener('click', handleClick);
    };
  }, [targetElement, trigger]);

  useEffect(() => {
    const hangingElement = hangingRef.current;
    if (!targetElement || !hangingElement) return;
    return autoUpdate(targetElement, hangingElement, update, {
      elementResize: typeof ResizeObserver !== 'undefined'
    });
  }, [targetElement]);

  useClickAway(
    () => {
      if (!trigger) return;
      setVisible(false);
    },
    [() => targetRef.current, hangingRef],
    ['click', 'touchmove']
  );

  const shouldRender = useShouldRender(visible, false, destroyOnHide);

  return (
    <>
      <div
        className={classNames(targetClassName, `${classPrefix}-target`)}
        ref={targetRef}
      >
        {children}
      </div>
      {shouldRender && renderToContainer(getContainer, hanging)}
    </>
  );
};
PopOver.propTypes = {
  placement: t.oneOf([
    'top',
    'top-start',
    'top-end',
    'right',
    'right-start',
    'right-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'left',
    'left-start',
    'left-end'
  ]),
  stopPropagation: t.array,
  getContainer: t.oneOfType([t.func, t.any]) || t.oneOf([null, undefined]),
  destroyOnHide: t.bool,
  content: t.node.isRequired,
  children: t.node.isRequired,
  className: t.string,
  targetClassName: t.string
};

export default PopOver;
