import Vue from 'vue';

const isServer = Vue.prototype.$isServer;

export let supportsPassive = false;

export function on(target, event, handler, passive = false) {
    !isServer &&
        target.addEventListener(
            event,
            handler,
            supportsPassive ? { capture: false, passive } : false
        );
}

export function off(target, event, handler) {
    !isServer && target.removeEventListener(event, handler);
}
