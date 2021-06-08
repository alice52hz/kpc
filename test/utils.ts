import {render, ComponentConstructor, Component, createVNode as h} from 'intact';
// import {nextFrame as _nextFrame} from '../components/utils';
// import {createApp, render as vueRender} from 'vue';

// export function render(Component, props) {
    // const c = new Component(props);
    // c.init();
    // c.mount();
    // return c;
// }

export function mount(Component: ComponentConstructor, style: any, data: any) {
    const container = document.createElement('div');
    container.setAttribute('style', "width: 800px; height: 1080px; overflow: auto");
    if (style) {
        for (let key in style) {
            container.style[key as any] = style[key];
        }
    }
    if (data) {
        container.className = 'example ' + data.index;
    }
    document.body.appendChild(container);
    let instance: Component;
    render(h(Component, {ref: (i: Component) => instance = i}), container);
    // if (Component.prototype instanceof Component) {
        // instance = Intact.mount(Component, container);
        // render(h(Component), container);
    // } else {
        // // for vue@3.0
        // instance = Component(container);
    // }
    // scroll to the view
    window.scrollTo(0, document.scrollingElement!.scrollHeight - 1080);
    return instance!;
}

export function unmount(instance: any) {
    if (instance && !instance.destroyed) {
        instance.destroy();
        document.body.removeChild(instance.element.parentElement);
    }
}

export function dispatchEvent(target: HTMLElement, eventName: string, options: object) {
    let event: Event;
    if (document.createEvent) {
        event = document.createEvent('Event');
        event.initEvent(eventName, true, true);
    // } else if (document.createEventObject) {
        // event = document.createEventObject();
        // return target.fireEvent(`on${eventName}`, event);
    } else if (typeof CustomEvent !== 'undefined') {
        event = new CustomEvent(eventName);
    }
    Object.assign(event!, options);
    target.dispatchEvent(event!);
}

export function getElement(query: string) {
    const elements = document.querySelectorAll(query);
    for (let i = elements.length - 1; i > -1; i--) {
        if ((elements[i] as HTMLElement).style.display !== 'none') {
            return elements[i];
        }
    }
}

// export function getElements(query) {
    // const elements = document.querySelectorAll(query);
    // const ret = [];
    // for (let i = 0; i < elements.length; i++) {
        // if (elements[i].style.display !== 'none') {
            // ret.push(elements[i]);
        // }
    // }
    // return ret;
// }

// export function testDemos(req, test) {
    // const groups = {};
    // req.keys().forEach(item => {
        // const paths = item.split('/');
        // const name = paths[1];
        // const type = paths[3];
        // const Demo = req(item).default;

        // if (!groups[name]) {
            // groups[name] = [];
        // }
        // groups[name].push({
            // title: `${name[0].toUpperCase()}${name.substring(1)} ${type}`,
            // Demo: Demo,
        // });
    // });
    // Object.keys(groups).forEach(key => {
        // const value = groups[key];
        // describe(key, () => {
            // value.forEach(value => {
                // it(value.title, async () => {
                    // await test(value.Demo);
                    // // if (key === 'code') {
                        // // await wait(1000);
                    // // }
                // });
            // });
        // });
    // });
// }

export function wait(time: number = 0) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}

// export function nextFrame() {
    // return new Promise(resolve => {
        // _nextFrame(resolve);
    // });
// }

// export function renderVue(App, hook) {
    // const container = document.createElement('div');
    // document.body.appendChild(container);
    // const app = createApp(App);

    // hook && hook(app);

    // return app.mount(container);
// }

// export function unmountVue(vm) {
    // const container = vm.$el.parentElement;
    // vueRender(null, container);
    // document.body.removeChild(container);
// }