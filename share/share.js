// ==========================================================================
// Share
// ==========================================================================
/* jshint esnext: true */
import { APP_NAME } from '../utils/environment';
import AbstractModule from './AbstractModule';

const MODULE_NAME = 'Share';
const EVENT_NAMESPACE = `${APP_NAME}.${MODULE_NAME}`;

const EVENT = {
    CLICK: `click.${EVENT_NAMESPACE}`
};

export default class extends AbstractModule {
    constructor (options) {
        super(options);
    }

    init() {
        this.$el.on(EVENT.CLICK, '[data-share-platform]', (event) => this.share(event));
    }

    share(event) {
        event.preventDefault();

        const $this = $(event.currentTarget);
        const platform = $this.data('share-platform');
        const url = $this.data('share-url');
        let shareUrl;

        switch(platform) {

            case 'facebook':
                shareUrl = 'https://facebook.com/sharer/sharer.php?u=' + url;
                this.openWindow(shareUrl);
                break;

            case 'twitter':
                shareUrl = 'https://twitter.com/share?url=' + url
                         + '&amp;text=' + $this.data('share-text');
                this.openWindow(shareUrl);
                break;

            case 'pinterest':
                shareUrl = 'https://pinterest.com/pin/create/button/?url=' + url
                         + '&description=' + $this.data('share-text')
                         + '&media=' + $this.data('share-media');
                this.openWindow(shareUrl);
                break;

            case 'mail':
                const subject = $this.data('share-subject');
                const body = $this.data('share-body');
                this.openMail(subject, body);
                break;

        }
    }

    openWindow(url) {
        window.open(url, '', 'menubar=no, toolbar=no, resizable=yes, scrollbars=yes, height=500, width=600');
    }

    openMail(subject, body) {
        window.location = 'mailto:?subject=' + subject + '&body=' + body;
    }

    destroy() {
        super.destroy();
        this.$el.off(`.${EVENT_NAMESPACE}`);
    }
}
