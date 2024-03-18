import { createPortal } from 'react-dom';
import type { ReactElement, ReactPortal } from 'react';
import { canUseDom } from './can-use-dom';

export type GetContainer = HTMLElement | (() => HTMLElement) | null | undefined;

export function resolveContainer(getContainer: GetContainer) {
  const container =
    typeof getContainer === 'function' ? getContainer() : getContainer;
  return container || document.body;
}

export function renderToContainer(
  getContainer: GetContainer,
  node: ReactElement
) {
  if (canUseDom && getContainer) {
    const container = resolveContainer(getContainer);
    return createPortal(node, container) as ReactPortal;
  }
  return node;
}
