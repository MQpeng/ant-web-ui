import { addClass, setStyle, setAttribute } from '@platform/browser';

export function MessageBuild(
  option: {
    nzType: 'success' | 'info' | 'warning' | 'error' | 'loading';
    nzDuration?: number;
    nzMaxStack?: number;
    content: string;
  } = {
    nzType: 'success',
    content: '',
  },
) {
  let container = document.querySelector('.aui-msg-container');
  if (!container) {
    container = document.createElement('div');
    addClass(container, 'aui-msg-container');
    document.body.appendChild(container);
  }
  setStyle(container, 'position', 'fixed', null);
  setStyle(container, 'top', '24px', null);
  setStyle(container, 'width', '100%', null);
  setStyle(container, 'z-index', '999999999999999', null);

  const len = container.childNodes.length;
  if (len >= (option.nzMaxStack || 7)) {
    container.removeChild(container.childNodes[0]);
  }

  const msg = document.createElement('aui-message');
  setAttribute(msg, 'nz-type', option.nzType || 'success');
  setAttribute(msg, 'content', option.content);
  container.appendChild(msg);
}
