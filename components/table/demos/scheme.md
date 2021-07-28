---
title: 自定义单元格内容
order: 1
---

通过`TableColumn`的`template`扩展点，可以定义单元格内容。
组件会当前行数据`data`以及索引`index`作为数组传入该扩展点

> 该扩展点有个别名`default`，所以Vue下也可以不用指定`slot`的名称

```vdt
import {Table, TableColumn} from 'kpc/components/table';

const data = [{a: '虚拟DOM', b: '获取到了item.b', c: {c1: 'item.c.c1'}}];

<Table data={data}>
    <TableColumn title='定义该列单元格内容' key='a'>
        <b:template args="[data, index]">
            <a>{data.a}</a>
        </b:template>
    </TableColumn>
    <TableColumn title='key形式' key='b' />
    <TableColumn title='key为一个路径字符串' key='c.c1' />
    <TableColumn title='没有这个key，则返回空' key='d.d1' />
</Table>
```

```vue-template
<div>
    <Table :scheme="scheme" :data="data" />
    <Table :data="data">
        <TableColumn 
            title='定义该列单元格内容'
            key='a'
        >
            <a slot-scope="item">{item.a}</a>
        </TableColumn>
        <TableColumn title='key形式' key='b' />
        <TableColumn title='key为一个路径字符串' key='c.c1' />
        <TableColumn title='没有这个key，则返回空' key='d.d1' />
    </Table>
</div>
```

```vue-next-template
<div>
    <Table :scheme="scheme" :data="data" />
    <Table :data="data">
        <TableColumn 
            title='定义该列单元格内容'
            key='a'
        >
            <template v-slot="item">
                <a>{item.a}</a>
            </template>
        </TableColumn>
        <TableColumn title='key形式' key='b' />
        <TableColumn title='key为一个路径字符串' key='c.c1' />
        <TableColumn title='没有这个key，则返回空' key='d.d1' />
    </Table>
</div>
```

```vue-data
data() {
    return {
        scheme: {
            a: {
                title: '定义该列单元格内容',
                template: function(item) {
                    return <a>{item.a}</a>
                }
            },
            b: 'key形式',
            'c.c1': 'key为一个路径字符串',
            'd.d1': '没有这个key，则返回空', 
        },
        data: [{a: '虚拟DOM', b: '获取到了item.b', c: {c1: 'item.c.c1'}}]
    }
}
```

```jsx
import React from 'react';
import {Table, TableColumn} from 'kpc/components/table';
import './index.styl';

export default class Demo extends React.Component {
    render() {
        const data = [{a: '虚拟DOM', b: '获取到了item.b', c: {c1: 'item.c.c1'}}];
        const scheme = {
            a: {
                title: '定义该列单元格内容',
                template: function(item) {
                   return <a>{item.a}</a>
                }
            },
            b: 'key形式',
            'c.c1': 'key为一个路径字符串',
            'd.d1': '没有这个key，则返回空',
        };
    
        return (
            <div>
                <Table scheme={scheme} data={data} />
                <Table data={data}>
                    <TableColumn 
                        title='定义该列单元格内容'
                        template={(item) => {
                            return <a>{item.a}</a>
                       }
                        key='a'
                    />
                    <TableColumn title='key形式' key='b' />
                    <TableColumn title='key为一个路径字符串' key='c.c1' />
                    <TableColumn title='没有这个key，则返回空' key='d.d1' />
                </Table>
            </div>
        )
    }
}
```

```angular-ignore
不建议Angular下使用这种方式
```
