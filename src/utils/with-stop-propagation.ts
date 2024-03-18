import React from 'react';
import type { ReactElement } from 'react';

const eventMap = {
  click: 'onClick'
};

export type PropagationEvent = 'click';

export function withStopPropagation(
  events: PropagationEvent[],
  element: ReactElement
) {
  const props = { ...element.props };

  for (const key of events) {
    const prop = eventMap[key];
    props[prop] = function (e: Event) {
      e.stopPropagation();
      element.props[prop]?.(e);
    };
  }

  return React.cloneElement(element, props);
}
