import React from 'react';
import type { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { mergeProps, NativeProps, withNativeProps } from '../../utils';
import t from 'prop-types';

const classPrefix = `qnet-divider`;

export type DividerProps = {
  position?: 'left' | 'right' | 'center';
  direction?: 'horizontal' | 'vertical';
  children?: ReactNode;
} & NativeProps;

const defaultProps = {
  position: 'center',
  direction: 'horizontal'
};

const Divider: FC<DividerProps> = props => {
  const newProps = mergeProps(defaultProps, props);
  const { position, direction, className, children } = newProps;

  return withNativeProps(
    newProps,
    <div
      className={classNames(
        className,
        classPrefix,
        `${classPrefix}-${direction}`,
        `${classPrefix}-${position}`
      )}
    >
      {children && <div className={`${classPrefix}-content`}>{children}</div>}
    </div>
  );
};

Divider.propTypes = {
  position: t.oneOf(['left', 'right', 'center']),
  direction: t.oneOf(['horizontal', 'vertical']),
  children: t.node
};

export default Divider;
