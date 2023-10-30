import React, { useState } from 'react';
import type { FC, MouseEventHandler } from 'react';
import classNames from 'classnames';
import Loading from '../loading';
import {
  NativeProps,
  isPromise,
  mergeProps,
  withNativeProps
} from '../../utils';
import t from 'prop-types';

const classPrefix = `qnet-button`;

export type ButtonProps = {
  // 类型
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  // 大小
  size?: 'mini' | 'small' | 'middle' | 'large';
  // 填充模式
  fill?: 'filled' | 'outline' | 'none';
  // 是否块级
  block?: boolean;
  // 是否禁用
  disabled?: boolean;
  // 是否加载
  loading?: 'auto' | boolean;
  // 加载时文本
  loadingText?: string;
  // 加载时图标
  loadingIcon?: React.ReactNode;
  // 原生 button 标签的 type 属性
  nativeType?: 'submit' | 'reset' | 'button';
  // 按钮形状
  shape?: 'default' | 'round' | 'square';
  // 点击后跳转的链接
  url?: string;
  // 点击后跳转的链接 是否在新页面打开
  target?: boolean;
  // 点击事件
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | Promise<void>;
  // 子元素
  children?: React.ReactNode;
} & NativeProps<
  | '--text-color'
  | '--background-color'
  | '--border-radius'
  | '--border-width'
  | '--border-style'
  | '--border-color'
>;

const defaultProps: ButtonProps = {
  type: 'default',
  size: 'middle',
  fill: 'filled',
  block: false,
  disabled: false,
  loading: false,
  loadingIcon: <Loading size={20} />,
  nativeType: 'button',
  shape: 'default',
  target: true
};

const Button: FC<ButtonProps> = props => {
  const newProps = mergeProps(defaultProps, props);
  const {
    onClick,
    loading,
    disabled,
    nativeType,
    block,
    fill,
    size,
    type,
    shape,
    children,
    loadingIcon,
    loadingText,
    url,
    target,
    className
  } = newProps;
  const [innerLoading, setInnerLoading] = useState(false);
  const newLoading = loading === 'auto' ? innerLoading : loading;
  const newdisabled = disabled || newLoading;

  const handleClick: MouseEventHandler<HTMLButtonElement> = async e => {
    if (url) {
      if (target) {
        window.open(url);
      } else {
        window.location.href = url;
      }
      return;
    }

    if (!onClick) return;

    const promise = onClick(e);

    if (isPromise(promise)) {
      try {
        setInnerLoading(true);
        await promise;
        setInnerLoading(false);
      } catch (e) {
        setInnerLoading(false);
        throw e;
      }
    }
  };

  return withNativeProps(
    newProps,
    <button
      type={nativeType}
      onClick={handleClick}
      disabled={newdisabled}
      className={classNames(
        className,
        classPrefix,
        `${classPrefix}-${type}`,
        `${classPrefix}-${size}`,
        `${classPrefix}-fill-${fill}`,
        `${classPrefix}-shape-${shape}`,
        {
          [`${classPrefix}-block`]: block,
          [`${classPrefix}-disabled`]: newdisabled,
          [`${classPrefix}-loading`]: newLoading
        }
      )}
    >
      {newLoading ? (
        <div className={`${classPrefix}-loading-wrapper`}>
          {loadingIcon}
          {loadingText && <span>{loadingText}</span>}
        </div>
      ) : (
        children
      )}
    </button>
  );
};

Button.propTypes = {
  type: t.oneOf(['default', 'primary', 'success', 'warning', 'danger']),
  size: t.oneOf(['mini', 'small', 'middle', 'large']),
  fill: t.oneOf(['filled', 'outline', 'none']),
  block: t.bool,
  disabled: t.bool,
  loading: t.any,
  loadingText: t.string,
  loadingIcon: t.node,
  nativeType: t.oneOf(['submit', 'reset', 'button']),
  shape: t.oneOf(['default', 'round', 'square']),
  url: t.string,
  target: t.bool,
  children: t.node,
  onClick: t.func
};

export default Button;
