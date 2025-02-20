import {
    Component,
    provide,
    createRef,
    Children,
    TypeDefs,
    RefObject,
} from 'intact';
import template from './base.vdt';
import {Sizes, sizes} from '../../styles/utils';
import {SELECT} from './constants';
import type {Input} from '../input';
import {useShowHideEvents} from '../../hooks/useShowHideEvents';
import {bind} from '../utils';
import {Dropdown} from '../dropdown';
import {State} from '../../hooks/useState';
import {useInput} from './useInput';
import {Container} from '../portal';
import {useFocusout} from './useFocusout';
import type {Events} from '../types';
import {isNullOrUndefined} from 'intact-shared';

export interface BaseSelectProps<V, Multipe extends boolean = boolean, Attach = V | null> {
    value?: Multipe extends true ? V[] : Attach
    multiple?: Multipe 
    filterable?: boolean
    loading?: boolean
    disabled?: boolean
    name?: string
    size?: Sizes
    hideIcon?: boolean
    clearable?: boolean
    fluid?: boolean
    inline?: boolean
    placeholder?: Children
    container?: Container
    width?: string | number

    _show?: boolean
}

export interface BaseSelectEvents {
    keydown: [KeyboardEvent]
    focusout: [FocusEvent]
    show: []
    hide: []
}

export interface BaseSelectBlocks<V> {
    value: [V, Children]
    values: [V[], Children[]]
    prefix: null
    suffix: null
}

const typeDefs: Required<TypeDefs<BaseSelectProps<any>>> = {
    value: null,
    multiple: Boolean,
    filterable: Boolean,
    loading: Boolean,
    disabled: Boolean,
    name: String,
    size: sizes,
    hideIcon: Boolean,
    clearable: Boolean,
    fluid: Boolean,
    inline: Boolean,
    placeholder: [String, Number],
    container: [Function, String],
    width: [String, Number],

    _show: Boolean,
};

const defaults = (): Partial<BaseSelectProps<any>> => ({
    size: 'default',
});

const events: Events<BaseSelectEvents> = {
    keydown: true,
    focusout: true,
    show: true,
    hide: true,
};

export abstract class BaseSelect<
    T extends BaseSelectProps<any> = BaseSelectProps<any>,
    E extends BaseSelectEvents = BaseSelectEvents,
    B extends BaseSelectBlocks<any> = BaseSelectBlocks<any>,
> extends Component<T, E, B> {
    static template = template;
    static typeDefs = typeDefs;
    static defaults = defaults;
    static events = events;

    public dropdownRef = createRef<Dropdown>(); 
    public input = useInput(this.resetKeywords);
    private focusout = useFocusout();

    init() {
        provide(SELECT, this);
        useShowHideEvents('_show');
        // this.input = useInput();

        this.watch('value', this.position, {presented: true});
    }

    protected abstract getPlaceholder(): Children
    protected abstract getLabel(): Children

    @bind
    position() {
        const dropdown = this.dropdownRef.value!;
        if (dropdown.get('value')) {
            dropdown.position();
        }
    }

    @bind
    show() {
        this.set('_show', true);
    }

    @bind
    hide() {
        this.set('_show', false);
    }

    public resetKeywords(keywords: State<string>) {
        keywords.set('');
    }

    protected hasValue() {
        const {value, multiple} = this.get();
        return !isNullOrUndefined(value) && (multiple ? value.length : value !== '');
    }

    private delete(index: number, e: MouseEvent) {
        if (this.get('disabled')) return;

        e.stopPropagation();

        const value = (this.get('value') as any[]).slice(0);
        value.splice(index, 1);
        this.set('value', value);
    }

    @bind
    protected clear(e: MouseEvent) {
        e.stopPropagation();
        this.set('value', this.get('multiple') ? [] : null);
    }

    @bind
    private onKeydown(e: KeyboardEvent) {
        this.trigger('keydown', e);
        switch (e.keyCode) {
            case 13: // enter
                this.show();
                break;
            case 9: // tab
            case 27: // esc
                this.hide();
                break;
        }
    }
}
