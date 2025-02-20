---
title: React中使用
order: 1.2
sidebar: doc
---

# 安装

## Npm 

```shell
npm install @king-design/react -S
```

## Yarn

```shell
yarn add @king-design/react 
```

# 使用

```js
import React from 'react';
import {Button, Message} from '@king-design/react';

class App extends React.Component {
    hello() {
        Message.success('Welcome to kpc world!');
    }
    render() {
        return <Button onClick={this.hello}>Hello World</Button>
    }
}
```

# 注意事项

当需要将vNode作为属性传给KingDesign组件时，需要使用`normalize`方法处理vNode

> 如果是作为子元素`children`，则没有必要`normalize`，因为组件默认会normalize子元素

```js
import React from 'react';
import {normalize, Badge} from '@king-design/react';

class App extends React.Component {
    render() {
        return (
            // 作为属性，需要normalize
            <Badge text={normalize(<i>test</i>)}>
                <div>test</div>
            </Badge>
        )
    }
}
```
