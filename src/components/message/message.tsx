import { Component, Prop, h, Listen, Element, Method } from '@stencil/core';
export interface NzMessageDataOptions {
  nzDuration?: number;
  nzAnimate?: boolean;
  nzPauseOnHover?: boolean;
}

@Component({
  tag: 'aui-message',
  styleUrl: 'message.scss',
  scoped: true,
})
export class MessageComponent {
  /**
   * Duration (milliseconds), does not disappear when set to 0
   */
  @Prop() nzDuration: number = 3000;
  /**
   * The maximum number of messages that can be displayed at the same time
   */
  @Prop() nzMaxStack: number = 7;
  /**
   * Do not remove automatically when mouse is over while setting to `true`
   */
  @Prop() nzPauseOnHover: boolean = true;
  /**
   * Whether to turn on animation
   */
  @Prop() nzAnimate: boolean = true;
  /**
   * Distance from `top`
   */
  @Prop() nzTop: string | number = 24;
  /**
   * Direction of the text in the messages
   */
  @Prop() nzDirection: 'ltr' | 'rtl' = 'ltr';

  @Prop() content: string;

  @Prop() nzType: 'success' | 'info' | 'warning' | 'error' | 'loading';

  private getIcon(): string {
    // return format(this.first, this.middle, this.last);
    return {
      success: 'icon-check-circle',
      info: 'icon-info-circle',
      warning: 'icon-warning-circle',
      error: 'icon-close-circle',
      loading: 'icon-sync',
    }[this.nzType];
  }

  @Listen('mouseenter')
  onEnter() {
    if (this.nzPauseOnHover) {
      this.stopTimer();
    }
  }

  @Listen('mouseleave')
  onLeave() {
    this.startTimer();
  }

  timer: any;
  componentDidRender() {
    this.startTimer();
  }

  @Element() el: HTMLElement;

  startTimer() {
    if (this.timer) return;
    this.timer = setTimeout(() => {
      this.el.remove();
      this.timer = null;
    }, this.nzDuration);
  }

  @Method()
  close() {
    this.el.remove();
  }

  stopTimer() {
    if (!this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    return (
      <div class="ant-message-notice">
        <div class={`ant-message-notice-content ant-message-${this.nzType}`}>
          <aui-icon nz-iconfont={this.getIcon()} nzSpin={this.nzType == 'loading'}></aui-icon>
          <span innerHTML={this.content}></span>
        </div>
      </div>
    );
  }
}
