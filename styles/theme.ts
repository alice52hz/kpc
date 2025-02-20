import { palette, deepDefaults, deepExtends } from './utils';

export type Theme = {[name: string]: string | number | Theme};

export function defaultTheme() {
    return {
        large: {
            height: '40px',
            fontSize: '14px',
            padding: '24px',
        },
        default: {
            height: '32px',
            fontSize: '12px',
            padding: '16px',
        },
        small: {
            height: '24px',
            fontSize: '12px',
            padding: '8px',
        },
        mini: {
            height: '16px',
            fontSize: '12px',
            padding: '8px',
        },
        color: {
            primary: '#0091ea',
            warning: '#ff9800',
            danger: '#ff4133',
            success: '#36b342',
            border: '#ccc',
            text: '#4c4c4c',
            ghost: '#737373',
            bg: '#f1f1f5',
            title: '#333',
            darkBorder: '#b2b2b2',
            placeholder: '#b2b2b2',
            get link() { return theme.color.primary },
            get linkHover() { return palette(theme.color.primary, -1) }, 
            get hoverBg() { return palette(theme.color.primary, -4) }, 
            disabled: '#ccc',
            disabledBg: '#f2f2f2',
            disabledBorder: '#ccc',
            lightBlack: '#737373',
        },
        borderRadius: '2px',
        boxShadow: '0 0 16px 0 rgba(0, 0, 0, .1)',
        fontSize: '12px',
        lineHeight: 1.5,
    
        maxZIndex: 9999,
        midZIndex: 999,
    
        transition: {
            small: '.1s cubic-bezier(0.42, 0, 0.58, 1)',
            middle: '.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
            large: '.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
        },
    }    
}

let theme = defaultTheme();
export function resetTheme() {
    theme = defaultTheme();
}
export {theme};

const queue: Function[] = [];
export function push(setTheme: Function) {
    queue.push(setTheme);
}

export function setTheme(customTheme: Theme) {
    resetTheme();
    deepExtends(theme, customTheme);
    // queue
    queue.forEach(fn => fn());
}

export function setDefault(setTheme: Function) {
    setTheme();
    push(setTheme);
}

// push(resetTheme);
// export const theme = defualtTheme();

// export const theme = {
//     large: {
//         height: '40px',
//         fontSize: '14px',
//         padding: '24px',
//     },
//     default: {
//         height: '32px',
//         fontSize: '12px',
//         padding: '16px',
//     },
//     small: {
//         height: '24px',
//         fontSize: '12px',
//         padding: '8px',
//     },
//     mini: {
//         height: '16px',
//         fontSize: '12px',
//         padding: '8px',
//     },
//     color: {
//         lightBlack: '#737373',
//         primary: '#0091ea',
//         warning: '#ff9800',
//         danger: '#ff4133',
//         success: '#36b342',
//         border: '#ccc',
//         text: '#4c4c4c',
//         ghost: '#737373',
//         bg: '#f1f1f5',
//         title: '#333',
//         darkBorder: '#b2b2b2',
//         placeholder: '#b2b2b2',
//         get link() { return theme.color.primary },
//         get linkHover() { return palette(theme.color.primary, -1) }, 
//         disabled: '#ccc',
//         disabledBg: '#f2f2f2',
//         disabledBorder: '#ccc',
//     },
//     borderRadius: '2px',
//     boxShadow: '0 0 4px 0 rgba(0, 0, 0, .3)',
//     fontSize: '12px',
//     lineHeight: 1.5,

//     maxZIndex: 9999,
//     midZIndex: 999,

//     transition: '.25s ease-in-out',
// }
