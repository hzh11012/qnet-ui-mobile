import './global.less';
import { canUseDom } from '../utils/can-use-dom';

if (canUseDom) {
  // Make sure the `:active` CSS selector of `button` and `a` take effect
  // See: https://stackoverflow.com/questions/3885018/active-pseudo-class-doesnt-work-in-mobile-safari
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  document.addEventListener('touchstart', () => {}, true);
}
