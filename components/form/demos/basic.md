---
title: 基本用法
order: 0
---

表单需要`Form`嵌套`FormItem`进行使用，`FormItem`中可以包含任意组件或原生元素。
同时我们可以指定`FormItem`的表单验证规则：

1. 给`FormItem`添加`value`属性，指定需要验证的数据。如果不指定，则不会进行任何验证
2. 给`FormItem`添加`rules`属性，指定需要验证的规则。如果不指定，则不会进行任何验证。内置的验证规则如下：
    1. `required {boolean}`：必须填写
    2. `digits {boolean}`： 请输入数字
    3. `email {boolean}`: 请输入正确的邮箱地址
    4. `url {boolean}`: 请输入正确的网址
        > 该规则可以验证IP地址，但是会排除`192.168.X.X | 192.254.X.X | 172.16.0.0 - 172.31.255.255 | 10.X.X.X | 172.X.X.X`这类保留IP地址
    5. `date {boolean}`：请输入正确的日期
    6. `dateISO {boolean}`：请输入正确的日期（YYYY-MM-DD）
    7. `number {boolean}`：请输入正确的数
    8. `maxLength {number}`：如果检验的值是数组：最多选择n项；如果检验的值是字符串：最多输入n个字符
    9. `minLength {number}`：同上（检验最少长度）
    10. `rangeLength {Array<number>}`：同上，检验长度的范围
    11. `max {number}`：请输入不大于n的数
    12. `min {number}`：请输入不小于n的数
    13. `range {Array<number>}`：请输入min到max之间的数
    14. `step {number}`：请输入步长为n的数
    15. `equalTo {string}`：两次输入不一致
3. 给`FormItem`添加`messages`属性，指定验证失败时展示的错误提示。默认内容如上所示
4. 给`FormItem`添加`classNames`属性，指定验证失败时错误元素需要额外添加的`className`，默认不添加

表单验证通过会触发`submit`事件（不通过不会触发），我们可以绑定该事件来提交数据。或者我们也可以
手动调用`Form`的`validate()`方法来验证，该函数为异步函数，返回`true`或`false`来标示验证是否通过。
另外，验证失败时，可以通过`Form`的`getFirstInvalidFormItem()`方法来获取第一条出错的`FormItem`

```vdt
import {
    Form, FormItem,
    Input,
    Select, Option,
    Checkbox,
    Radio,
    ButtonGroup, Button,
    Switch,
    Slider,
    Datepicker,
} from 'kpc';

<Form ev-submit={this.submit} ref="form" labelWidth="200">
    <FormItem label="Input" value={this.get('model.input')} rules={{required: true}}>
        <Input v-model="model.input" />
    </FormItem>
    <FormItem label="Select" value={this.get('model.select')}
        rules={{required: true}} 
        messages={{required: '必须选择'}}
    >
        <Select v-model="model.select">
            <Option value="Javascript">Javascript</Option>
            <Option value="PHP">PHP</Option>
            <Option value="C++">C++</Option>
        </Select>
    </FormItem>
    <FormItem label="Checkbox" value={this.get('model.checkbox')}
        rules={{required: true, maxLength: 2}}
        messages={{required: '必须选择'}}
    >
        <Checkbox trueValue="Javascript" v-model="model.checkbox">Javascript</Checkbox>
        <Checkbox trueValue="PHP" v-model="model.checkbox">PHP</Checkbox>
        <Checkbox trueValue="C++" v-model="model.checkbox">C++</Checkbox>
    </FormItem>
    <FormItem label="Radio" value={this.get('model.radio')}
        rules={{required: true}} 
        messages={{required: '必须选择'}}
    >
        <Radio trueValue="Javascript" v-model="model.radio">Javascript</Radio>
        <Radio trueValue="PHP" v-model="model.radio">PHP</Radio>
        <Radio trueValue="C++" v-model="model.radio">C++</Radio>
    </FormItem>
    <FormItem label="Radio ButtonGroup" value={this.get("model.buttonGroup")}
        rules={{required: true}} 
        messages={{required: '必须选择'}}
    >
        <ButtonGroup checkType="radio" v-model="model.buttonGroup">
            <Button value="Javascript">Javascript</Button>
            <Button value="PHP">PHP</Button>
            <Button value="C++">C++</Button>
        </ButtonGroup>
    </FormItem>
    <FormItem label="Switch" value={this.get("model.switch")}>
        <Switch v-model="model.switch" />
    </FormItem>
    <FormItem value={this.get("model.slider")} rules={{required: true, min: 1}} label="Slider">
        <Slider v-model="model.slider" showInput={false} />
    </FormItem>
    <FormItem value={this.get("model.date")} rules={{required: true}} label="Datepicker">
        <Datepicker v-model="model.date" />  
    </FormItem>
    <FormItem label="Textarea" value={this.get("model.textarea")}
        rules={{required: true}}
    >
        <Input type="textarea" v-model="model.textarea" />
    </FormItem>
    <FormItem label="Password" value={this.get("model.password")}
        rules={{required: true}}
    >
        <Input type="password" v-model="model.password" />
    </FormItem>
    <FormItem label="Confirm Password" value={this.get("model.confirmPassword")}
        rules={{required: true, equal: this.get('model.password')}}
    >
        <Input type="password" v-model="model.confirmPassword" />
    </FormItem>
    <FormItem>
        <Button type="primary" htmlType="submit" ev-click={this.handleSubmit}>提交</Button>
        <Button style="margin-left: 20px" ev-click={this.reset}>重置</Button>
    </FormItem>
</Form>
```

```styl
.k-slider
.k-select
    width 300px
.k-radio
.k-checkbox
    margin-right 10px

@media (max-width: 768px) 
    .k-form-item
        width 100%
        .k-input
        .k-select
        .k-datepicker
        .k-slider
            width 100%
        .k-label
            width 100px !important
```

```ts
import {Message, bind} from 'kpc';

interface Props {
    model: Model
}

type Model = {
    input?: string
    select?: string
    checkbox: string[] 
    radio?: string
    buttonGroup?: string
    switch?: boolean
    slider?: number
    date?: string
    textarea?: string
    password?: string
    confirmPassword?: string
}

export default class extends Component<Props> {
    static template = template;

    static defaults() {
        return {
            model: {
                checkbox: []
            }
        } as Props;
    }

    @bind
    submit() {
        Message.success('验证通过，开始提交');
        console.log(this.get('model'));
    }

    @bind
    async handleSubmit() {
        if (await this.refs.form.validate()) {
            console.log('验证通过，开始提交');
        } else {
            // 验证失败，我们可以获取第一条出错的FormItem
            console.log(this.refs.form.getFirstInvalidFormItem());
        }
    }

    @bind
    reset() {
        this.set('model', {checkbox: []});
        this.refs.form.reset();
        console.log(this.get('model'));
    }
}
```
