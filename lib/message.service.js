var AUIMessageService = (function (exports) {
  'use strict';

  const NAMESPACE_URIS = {
      'svg': 'http://www.w3.org/2000/svg',
      'xhtml': 'http://www.w3.org/1999/xhtml',
      'xlink': 'http://www.w3.org/1999/xlink',
      'xml': 'http://www.w3.org/XML/1998/namespace',
      'xmlns': 'http://www.w3.org/2000/xmlns/',
      'math': 'http://www.w3.org/1998/MathML/',
  };
  /**
   * Flags for renderer-specific style modifiers.
   * @publicApi
   */
  var RendererStyleFlags2;
  (function (RendererStyleFlags2) {
      // TODO(misko): This needs to be refactored into a separate file so that it can be imported from
      // `node_manipulation.ts` Currently doing the import cause resolution order to change and fails
      // the tests. The work around is to have hard coded value in `node_manipulation.ts` for now.
      /**
       * Marks a style as important.
       */
      RendererStyleFlags2[RendererStyleFlags2["Important"] = 1] = "Important";
      /**
       * Marks a style as using dash case naming (this-is-dash-case).
       */
      RendererStyleFlags2[RendererStyleFlags2["DashCase"] = 2] = "DashCase";
  })(RendererStyleFlags2 || (RendererStyleFlags2 = {}));
  function addClass(el, cls) {
      el.classList.add(cls);
  }
  function setAttribute(el, name, value, namespace) {
      if (namespace) {
          name = namespace + ':' + name;
          const namespaceUri = NAMESPACE_URIS[namespace];
          if (namespaceUri) {
              el.setAttributeNS(namespaceUri, name, value);
          }
          else {
              el.setAttribute(name, value);
          }
      }
      else {
          el.setAttribute(name, value);
      }
  }
  function setStyle(el, style, value, flags) {
      if (flags & (RendererStyleFlags2.DashCase | RendererStyleFlags2.Important)) {
          el.style.setProperty(style, value, flags & RendererStyleFlags2.Important ? 'important' : '');
      }
      else {
          el.style[style] = value;
      }
  }

  function MessageBuild(option = {
      nzType: 'success',
      content: '',
  }) {
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

  exports.MessageBuild = MessageBuild;

  return exports;

}({}));
