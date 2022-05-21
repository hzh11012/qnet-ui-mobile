import React from 'react';
import classNames from 'classnames';
import { NativeProps, withNativeProps } from '../../utils/native-props';
import { mergeProps } from '../../utils/with-default-props';
import t from 'prop-types';

const classPrefix = `qnet-divider`;

export type DividerProps = {
  position?: 'left' | 'right' | 'center';
  direction?: 'horizontal' | 'vertical';
  children?: React.ReactNode;
} & NativeProps;

const defaultProps = {
  position: 'center',
  direction: 'horizontal'
};

const Divider: React.FC<DividerProps> = props => {
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
