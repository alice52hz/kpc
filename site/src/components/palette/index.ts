import template from './index.vdt';
import {Component} from 'intact';
// import './index.styl';
import Chroma from 'chroma-js';
import {Message} from 'kpc';

interface PaletteProps  {
    primaryColor: string
    colors: string[]
}

export default class extends Component<PaletteProps> {
    static template = template;

    static defaults() {
        return {
            primaryColor: '#0091ea',
            colors: [],
        };
    }

    _init() {
        this._generate();
        this.on('$change:primaryColor', this._generate);
    }

    _generate() {
        const color = this.get('primaryColor');
        const colors = [];

        for (let i = -4; i < 5; i++) {
            colors.push(this._palette(color, i));
        }

        this.set({colors});
    }

    _palette(color: string, level: number) {
        const [h, s, b] = Chroma(color).hsv();
        const deS = s < 0.1 ? 0 : (s - 0.1) / 4;
        const inS = (1 - s) / 4;
        const deB = (1 - b) / 4;
        const inB = b <= 0.4 ? 0 : (b - 0.4) / 4;

        if (level < 0 && level >= -4)
            return Chroma.hsv(h + level, s + level * deS, b - level * deB).hex();
        else if (level > 0 && level <= 4)
            return Chroma.hsv(h + level, s + level * inS, b - level * inB).hex();
        else
            return color;
    }

    _changeColor(e: InputEvent) {
        const target = e.target as HTMLInputElement;
        const value = target.value.trim();
        if (/#[0-9a-f]{6}/i.test(value)) {
            this.set('primaryColor', target.value);
        } else {
            Message.error('请输入hex格式颜色值');
        }
    }
}
