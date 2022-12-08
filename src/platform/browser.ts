export const NAMESPACE_URIS: {[ns: string]: string} = {
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
export enum RendererStyleFlags2 {
  // TODO(misko): This needs to be refactored into a separate file so that it can be imported from
  // `node_manipulation.ts` Currently doing the import cause resolution order to change and fails
  // the tests. The work around is to have hard coded value in `node_manipulation.ts` for now.
  /**
   * Marks a style as important.
   */
  Important = 1 << 0,
  /**
   * Marks a style as using dash case naming (this-is-dash-case).
   */
  DashCase = 1 << 1
}

export function addClass(el: Element, cls: string) {
  el.classList.add(cls);
}

export function removeClass(el: Element, cls: string) {
  el.classList.remove(cls);
}

export function setAttribute(el: Element, name: string, value: string, namespace?: string): void {
  if (namespace) {
    name = namespace + ':' + name;
    const namespaceUri = NAMESPACE_URIS[namespace];
    if (namespaceUri) {
      el.setAttributeNS(namespaceUri, name, value);
    } else {
      el.setAttribute(name, value);
    }
  } else {
    el.setAttribute(name, value);
  }
}

export function removeAttribute(el: Element, name: string, namespace?: string): void {
  if (namespace) {
    const namespaceUri = NAMESPACE_URIS[namespace];
    if (namespaceUri) {
      el.removeAttributeNS(namespaceUri, name);
    } else {
      el.removeAttribute(`${namespace}:${name}`);
    }
  } else {
    el.removeAttribute(name);
  }
}

export function setStyle(el: any, style: string, value: any, flags: RendererStyleFlags2): void {
  if (flags & (RendererStyleFlags2.DashCase | RendererStyleFlags2.Important)) {
    el.style.setProperty(style, value, flags & RendererStyleFlags2.Important ? 'important' : '');
  } else {
    el.style[style] = value;
  }
}

export function removeStyle(el: any, style: string, flags: RendererStyleFlags2): void {
  if (flags & RendererStyleFlags2.DashCase) {
    el.style.removeProperty(style);
  } else {
    // IE requires '' instead of null
    // see https://github.com/angular/angular/issues/7916
    el.style[style] = '';
  }
}
