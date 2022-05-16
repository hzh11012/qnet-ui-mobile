import React from 'react';
import classNames from 'classnames';
import { NativeProps, withNativeProps } from '../../utils/native-props';
import { mergeProps } from '../../utils/with-default-props';
import t from 'prop-types';

const classPrefix = `qnet-space`;

export type SpaceProps = {
  direction?: 'horizontal' | 'vertical';
  align?: 'start' | 'end' | 'center' | 'baseline';
  justify?:
    | 'start'
    | 'end'
    | 'center'
    | 'between'
    | 'around'
    | 'evenly'
    | 'stretch';
  wrap?: boolean;
  block?: boolean;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
} & NativeProps<'--gap' | '--gap-vertical' | '--gap-horizontal'>;

const defaultProps = {
  direction: 'horizontal',
  wrap: false,
  block: false
};

const Space: React.FC<SpaceProps> = props => {
  const newProps = mergeProps(defaultProps, props);
  const { direction, onClick } = newProps;
  return withNativeProps(
    newProps,
    <div
      className={classNames(classPrefix, {
        [`${classPrefix}-wrap`]: newProps.wrap,
        [`${classPrefix}-block`]: newProps.block,
        [`${classPrefix}-${direction}`]: true,
        [`${classPrefix}-align-${newProps.align}`]: !!newProps.align,
        [`${classPrefix}-justify-${newProps.justify}`]: !!newProps.justify
      })}
      onClick={onClick}
    >
      {React.Children.map(newProps.children, child => {
        return (
          child !== null &&
          child !== undefined && (
            <div className={`${classPrefix}-item`}>{child}</div>
          )
        );
      })}
    </div>
  );
};

Space.propTypes = {
  direction: t.oneOf(['horizontal', 'vertical']),
  align: t.oneOf(['start', 'end', 'center', 'baseline']),
  justify: t.oneOf([
    'start',
    'end',
    'center',
    'between',
    'around',
    'evenly',
    'stretch'
  ]),
  wrap: t.bool,
  block: t.bool,
  children: t.node,
  onClick: t.func,
  className: t.string,
  style: t.object,
  tabIndex: t.number
};

export default Space;
