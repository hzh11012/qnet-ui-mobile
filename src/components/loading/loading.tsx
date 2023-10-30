import React from 'react';
import type { FC } from 'react';
import classNames from 'classnames';
import { NativeProps, withNativeProps, mergeProps } from '../../utils';
import { useSpring, animated } from '@react-spring/web';
import t from 'prop-types';

const classPrefix = `qnet-loading`;

export type LoadingProps = {
  color?: string;
  size?: string | number;
  type?: 'spin' | 'circle' | 'dot';
  textColor?: string;
  textSize?: string | number;
  vertical?: boolean;
  children?: string;
} & NativeProps<'--color' | '--size' | '--text-color' | '--text-size'>;

const defaultProps = {
  size: '32',
  type: 'spin',
  textSize: '14',
  vertical: false
};

const Loading: FC<LoadingProps> = props => {
  const newProps = mergeProps(defaultProps, props);
  const { color, size, type, textSize, textColor, vertical, children } =
    newProps;

  const { percent } = useSpring({
    loop: {
      reverse: true
    },
    from: {
      percent: 30
    },
    to: {
      percent: 80
    },
    config: {
      duration: 1200
    }
  });
  const circumference = 15 * 3.14159265358979 * 2;
  const SpinLoading = (
    <animated.div
      className={classNames(`${classPrefix}-spin`)}
      style={
        {
          '--color': color,
          '--size': `${size}px`,
          '--percent': percent
        } as any
      }
    >
      <svg
        className={classNames(`${classPrefix}-spin-svg`)}
        viewBox="0 0 32 32"
      >
        <animated.circle
          className={classNames(`${classPrefix}-spin-fill`)}
          fill="transparent"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={percent}
          strokeLinecap="square"
          r={15}
          cx={16}
          cy={16}
        />
      </svg>
    </animated.div>
  );

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const CircleLoading = (
    <div
      className={classNames(`${classPrefix}-circle`)}
      style={
        {
          '--color': color,
          '--size': `${size}px`
        } as any
      }
    >
      {arr.map((index: number) => {
        return (
          <i
            key={index}
            className={classNames(`${classPrefix}-circle--${index}`)}
          ></i>
        );
      })}
    </div>
  );

  const DotLoading = (
    <div
      className={classNames(`${classPrefix}-dot`)}
      style={
        {
          '--color': color,
          '--size': `${size}px`
        } as any
      }
    >
      <svg
        className={classNames(`${classPrefix}-dot-svg`)}
        viewBox="0 0 100 40"
        style={{ verticalAlign: '-0.125em' }}
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-100.000000, -71.000000)">
            <g transform="translate(95.000000, 71.000000)">
              <g transform="translate(5.000000, 0.000000)">
                {[0, 1, 2].map(i => (
                  <rect
                    key={i}
                    fill="currentColor"
                    x={20 + i * 26}
                    y="16"
                    width="8"
                    height="8"
                    rx="2"
                  >
                    <animate
                      attributeName="y"
                      from="16"
                      to="16"
                      dur="2s"
                      begin={`${i * 0.2}s`}
                      repeatCount="indefinite"
                      values="16; 6; 26; 16; 16"
                      keyTimes="0; 0.1; 0.3; 0.4; 1"
                    />
                  </rect>
                ))}
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );

  let res;
  switch (type) {
    case 'circle':
      res = CircleLoading;
      break;
    case 'dot':
      res = DotLoading;
      break;
    default:
      res = SpinLoading;
      break;
  }

  return withNativeProps(
    newProps,
    <div
      className={classNames(`${classPrefix}`, {
        [`${classPrefix}-vertical`]: vertical
      })}
    >
      {res}
      {children && (
        <div
          className={classNames(`${classPrefix}-text`)}
          style={
            {
              '--text-color': textColor,
              '--text-size': `${textSize}px`
            } as any
          }
        >
          {children}
        </div>
      )}
    </div>
  );
};

Loading.propTypes = {
  type: t.oneOf(['spin', 'circle', 'dot']),
  color: t.string,
  size: t.oneOfType([t.string, t.number]),
  textColor: t.string,
  textSize: t.oneOfType([t.string, t.number]),
  vertical: t.bool,
  children: t.string
};

export default Loading;
