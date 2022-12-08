import { setStyle } from '@platform/browser';
import { Component, Prop, h, Element } from '@stencil/core';

@Component({
  tag: 'eui-icon',
  styleUrl: 'icon.scss',
  scoped: true
})
export class IconComponent {
  /**
   * Rotate icon with animation
   */
  @Prop() nzSpin: boolean;
  /**
   * Rotate degrees
   */
  @Prop() nzRotate: string;
  /**
   * Type of the ant design icon
   */
  @Prop() nzType: string;
  /**
   * Type of the ant design icon
   */
  @Prop() nzTheme: string;
  /**
   * Only support the two-tone icon. Specific the primary color.
   */
  @Prop() nzTwotoneColor: string;
  /**
   * Type of the icon from iconfont
   */
  @Prop() nzIconfont: string;

  @Element() el: HTMLElement;
  render() {
    if (this.nzSpin || this.nzType === 'loading') {
      setStyle(this.el, 'animation', 'loadingCircle 1s infinite linear', null);
    }
    return (
      <svg
        viewBox="0 0 1024 1024" height="1em" width="1em" fill="currentColor"
        style={{transform: this.nzRotate ? `rotate(${this.nzRotate}deg)`: 'none'}}
        class={{ 'anticon-spin': this.nzSpin || this.nzType === 'loading'  }}>
        <use xlinkHref={ '#' + (this.nzIconfont || this.nzType) }></use>
      </svg>
    );
  }
}
