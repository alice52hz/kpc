import {useInstance, findDomFromVNode} from 'intact';
import type {Dropdown} from './';
import {Options, position, Feedback} from '../position';

export function usePosition() {
    const instance = useInstance() as Dropdown;
    const positioned = {value: false}

    instance.on('hide', () => {
        positioned.value = false;
    });

    // if the dropdown is nested, we must show child after parent has positioned
    function p(ofElement: HTMLElement | MouseEvent | undefined, parentFeedback: Feedback | null): Feedback {

        let feedback: Feedback;
        position(findDomFromVNode(instance.menuVNode!, true) as HTMLElement, {
            my: 'left top+8',
            at: 'left bottom',
            ...instance.get('position'),
            of: ofElement,
            using: _feedback => {
                feedback = _feedback;
            },
        });

        positioned.value = true;
        instance.trigger('positioned', parentFeedback || feedback!);

        return parentFeedback || feedback!;
    }

    function handle(): Feedback | Promise<Feedback> {
        const _of = instance.get('of');

        if (_of === 'parent') {
            const parent = instance.dropdown!;
            if (process.env.NODE_ENV !== 'production') {
                if (!parent) {
                    throw new Error('The dropdown has not parent, so you can not use `parent` as `of`.');
                }
            }
            const ofElement = findDomFromVNode(parent.menuVNode!, true) as HTMLElement;
            if (parent.positionHook.positioned.value) {
                return p(ofElement, null);
            } else {
                // wait the parent has positioned
                return new Promise(resolve => {
                    const callback = (feedback: Feedback) => {
                        parent.off('positioned', callback);
                        // let the child menu has the same transtion with parent menu,
                        // when them show together
                        resolve(p(ofElement, feedback));
                    }
                    parent.on('positioned', callback);
                });
            }
        } else if (_of === 'self') {
            return p(findDomFromVNode(instance.$vNode!, true) as HTMLElement, null);
        } else {
            return p(_of as MouseEvent | undefined, null);
        }
    }

    return {handle, positioned};
}