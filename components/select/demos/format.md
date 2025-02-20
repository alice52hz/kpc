---
title: 自定义展示结果
order: 5.1 
---

通过`value`扩展点，我们可以自定义选择结果的展示；对于多选`multiple`还可以通过`values`扩展点来定义整个结果展示

> 存在`value`扩展点时，不能指定`filterable`来筛选

```vdt
import {Select, Option, Icon} from 'kpc';

<div>
    <div class="item">
        <span class="label">border:</span>
        <Select v-model="type">
            <Option v-for={['solid', 'dashed', 'dotted']}
                value={$value}
            >
                <div style={{borderBottom: `1px ${$value} #666`}} class="line"></div>
            </Option>
        </Select>
        <div style={{border: `1px ${this.get('type')} #b2b2b2`}} class="rect">
            Rectangle
        </div>
    </div>
    <div class="item">
        <span class="label">multiple:</span>
        <Select v-model="icons" multiple>
            <Option v-for={['ion-chatbubble', 'ion-person-stalker', 'ion-beer', 'ion-camera']}
                value={$value}
            >
                <Icon class={$value} />
            </Option>
            <b:value args="[value, label]">
                <Icon class={value} style="vertical-align: middle;" />
                <span class="c-middle">{value}</span>
            </b:value>
        </Select>
    </div>
    <div class="item">
        <span class="label">multiple values:</span>
        <Select v-model="icons1" multiple>
            <Option v-for={['ion-chatbubble', 'ion-person-stalker', 'ion-beer', 'ion-camera']}
                value={$value}
            >
                <Icon class={$value} />
            </Option>
            <b:values args="[values, labels]">
                <div class="k-value">已选择{values.length}项 / 总共4项</div>
            </b:values>
        </Select>
    </div>
</div>
```

```styl
/.k-select-option .line
    margin-top 16px
.item
    margin-bottom 16px
.rect
    display inline-block
    margin 0 16px
    vertical-align middle
    width 120px
    height 60px
    line-height 60px
    text-align center
.c-middle
    margin-left 6px
.label
    display inline-block
    width 100px
    text-align right
    margin-right 6px
```

```ts
export default class extends Component {
    static template = template;

    static defaults() {
        return {type: 'dashed', icons: ['ion-camera'], icons1: []};
    }
}
```
