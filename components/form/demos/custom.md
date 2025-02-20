---
title: 自定义验证规则
order: 1
---

当内置的验证规则不能满足需求时，我们还可以自定义验证规则。有如下两种方式添加规则：

1. 通过`Form.addMethod()`静态方法添加全局验证规则，由于是全局的，我们可以在任意地方的
`FormItem`中使用该规则。使用方法见API说明
2. 通过`FormItem`的`rules`属性，定义局部规则，该规则只对该`FormItem`有效

本例中，我们添加一条全局规则`letter`用来验证只能输入字母，同时添加一条局部规则
`unique`来验证所有输入必须不同

> 验证方法中`param`，即为使用该规则时传入的参数，例如本例中的`letter: true`，`true`会作为`param`
> 参数传给验证方法。当然我们还可以指定任意值，只要不是`false`就行，因为`false`代表不验证

```vdt
import {Form, FormItem, Input, Button} from 'kpc';

<Form>
    <FormItem label="描述">
        <FormItem v-for={this.get('descriptions')}
            value={$value}
            hideLabel
            rules={{
                required: true, 
                // 自定义全局规则
                letter: true,
                // 自定义局部规则: 所有描述必须不重复
                unique: this.unique 
            }}
        >
            <Input v-model={`descriptions[${$key}]`} />    
            <b:append>
                <Button ev-click={this.remove.bind(self, $key)}>删除</Button>
            </b:append>
        </FormItem>
        <Button ev-click={this.add}>添加</Button>
    </FormItem>
</Form>
```

```styl
.k-form-item
    .k-form-item
        margin-bottom 20px

@media (max-width: 768px)
    .k-form-item
        width 100%
        .k-input
            width 100%
        .k-label
            width auto
```

```ts
import {Form, bind} from 'kpc';

interface Props {
    descriptions: string[]
}

// 添加全局规则
Form.addMethod('letter', (value, param) => {
    return /^[a-z|A-Z]+$/.test(value);
}, '只能输入字母');

export default class extends Component<Props> {
    static template = template;
    static defaults() {
        return {
            descriptions: ['', '']
        }
    };

    @bind
    add() {
        this.set('descriptions', this.get('descriptions').concat(''));
    }

    @bind
    remove(index: number) {
        const descriptions = this.get('descriptions').slice(0);
        descriptions.splice(index, 1);
        this.set('descriptions', descriptions);
    }

    @bind
    unique(value: string) {
        let count = 0;
        this.get('descriptions').find(item => {
            if (item === value) count++;
            return count > 1;
        });

        // 直接返回错误文案，或者也可以单独定义messages为{unique: '不能相同'}
        return count === 1 || '不能相同';
    }
}
```

```vue-template
<Form>
    <FormItem label="描述">
        <FormItem v-for="($value, $key) in descriptions"
            :model="`descriptions[${$key}]`"
            hideLabel
            :rules="{
                required: true, 
                // 自定义全局规则
                letter: true,
                // 自定义局部规则，所有描述必须不重复
                unique: unique 
            }"
        >
            <Input v-model="descriptions[$key]" />    
            <template slot="append">
                <Button @click="remove($key)">删除</Button>
            </template>
        </FormItem>
        <Button @click="add">添加</Button>
    </FormItem>
</Form>
```

```vue-methods
add() {
    this.descriptions.push('');
}
remove(index: number) {
    this.descriptions.splice(index, 1);
}
```

```react-methods
add() {
    this.setState({descriptions: this.state.descriptions.concat('')});
}

onInput(index: number, v?: string) {
    const descriptions = this.state.descriptions.slice(0);
    descriptions[index] = v!;
    this.setState({descriptions});
}

render() {
    return (
        <Form>
            <FormItem label="描述">
                {this.state.descriptions.map(($value, $key) => {
                    return (
                        <FormItem
                            slotAppend={<Button onClick={this.remove.bind(self, $key)}>删除</Button>}
                            value={$value}
                            hideLabel
                            rules={{
                                required: true, 
                                // 自定义全局规则
                                letter: true,
                                // 自定义局部规则，所有描述必须不重复
                                unique: this.unique 
                            }}
                        >
                            <Input value={this.state.descriptions[$key]} 
                                onChangeValue={this.onInput.bind(this, $key)}
                            />    
                        </FormItem>
                    )
                })}
                <Button onClick={this.add}>添加</Button>
            </FormItem>
        </Form>
    )
}
```

```angular
// import {Component} from '@angular/core';
// import {Form} from 'kpc';
// 
// // 添加全局规则
// Form.addMethod('letter', (value, item, param) => {
//     return /^[a-z|A-Z]+$/.test(value);
// }, '只能输入字母');
// 
// @Component({
//     selector: 'app-demo',
//     template: `
//         <k-form>
//             <k-form-item label="标签">
//                 <k-form-item
//                     *ngFor="let value of descriptions; let i = index; trackBy: trackArray"
//                     [value]="value"
//                     [hideLabel]="true"
//                     [rules]="{
//                         required: true, 
//                         letter: true,
//                         unique: unique
//                     }"
//                     [force]="true"
//                 >
//                     <k-input [(value)]="descriptions[i]"></k-input>    
//                     <ng-template #append>
//                         <k-button (click)="remove(i)">删除</k-button>
//                     </ng-template>
//                 </k-form-item>
//                 <k-button (click)="add()">添加</k-button>
//             </k-form-item>
//         </k-form>
//     `,
//     styleUrls: ['./index.styl'],
// })
// export class AppDemoComponent {
//     private descriptions = ["", ""];
// 
//     add() {
//         this.descriptions = this.descriptions.concat('');
//     }
//     
//     remove(index) {
//         this.descriptions.splice(index, 1);
//     }
// 
//     trackArray(index) {
//         return index;
//     }
// 
//     // 局部验证规则
//     unique = (value) => {
//         let count = 0;
//         this.descriptions.find(item => {
//             if (item === value) count++;
//             return count > 1;
//         });
// 
//         // 直接返回错误文案，或者也可以单独定义messages为{unique: '不能相同'}
//         return count === 1 || '不能相同';
//     }
// }
```
