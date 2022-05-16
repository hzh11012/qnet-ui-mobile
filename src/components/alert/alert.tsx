import React from 'react';
import classNames from 'classnames';
import t from 'prop-types';

export interface AlertProps {
  kind?: 'info' | 'positive' | 'negative' | 'warning';
  children?: React.ReactNode;
}

export type KindMap = Record<Required<AlertProps>['kind'], string>;

const classPrefix = 'happy-alert';

const kinds: KindMap = {
  info: '#5352ED',
  positive: '#2ED573',
  negative: '#FF4757',
  warning: '#FFA502'
};

const Alert: React.FC<AlertProps> = ({ children, kind = 'info', ...rest }) => (
  <div
    className={classNames(classPrefix)}
    style={{
      background: kinds[kind]
    }}
    {...rest}
  >
    {children}
  </div>
);

Alert.propTypes = {
  kind: t.oneOf(['info', 'positive', 'negative', 'warning'])
};

export default Alert;
