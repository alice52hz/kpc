---
title: 按钮组
order: 1
---

将`Button`作为`ButtonGroup`的子元素，可以展示按钮组。给`ButtonGroup`添加`vertical`属性，
可以是按钮组纵向排列。给`ButtonGroup`添加`checkType`属性，可以使按钮组拥有单选或复选能力。

```vdt
import {Button, ButtonGroup} from 'kpc';

<div>
    <ButtonGroup>
        <Button>开机</Button>
        <Button>关机</Button>
        <Button>重启</Button>
    </ButtonGroup>
    <ButtonGroup>
        <Button type="danger">开机</Button>
        <Button type="danger">关机</Button>
        <Button type="danger">重启</Button>
    </ButtonGroup>
    <ButtonGroup>
        <Button type="primary">
            <i class="k-icon ion-ios-arrow-left"></i>上一页
        </Button>
        <Button type="primary">
            下一页<i class="k-icon ion-ios-arrow-right"></i>
        </Button>
    </ButtonGroup>
    <br /><br />
    <p>纵向按钮组</p>
    <ButtonGroup vertical>
        <Button type="primary">开机</Button>
        <Button type="primary">关机</Button>
        <Button type="primary">重启</Button>
    </ButtonGroup>
    <br /><br />
    <p>单选按钮组</p>
    <ButtonGroup checkType="radio" v-model="city">
        <Button value="beijing">北京</Button>
        <Button value="shanghai" ref="__radioShanghai">上海</Button>
        <Button value="guangzhou">广州</Button>
        <Button value="shenzhen">深圳</Button>
    </ButtonGroup>
    <p>多选按钮组</p>
    <ButtonGroup checkType="checkbox" v-model="cities">
        <Button value="beijing" size="small">北京</Button>
        <Button value="shanghai" size="small" ref="__checkboxShanghai">上海</Button>
        <Button value="guangzhou" size="small">广州</Button>
        <Button value="shenzhen" size="small">深圳</Button>
    </ButtonGroup>
</div>
```

```styl
.k-btns
    margin-right 20px
```

```ts
interface Props {
    city?: string
    cities?: string[]
}

export default class extends Component<Props> {
    static template = template;

    static defaults() {
        return {
            city: 'beijing',
            cities: []
        } as Props;
    } 
}
```
