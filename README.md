<!--
 * @Description: 
 * @Author: yuanzeyu
 * @Date: 2023-11-01 15:28:13
 * @LastEditTime: 2023-11-01 19:36:40
-->

## 快速预览

<img src="https://github.com/FireTable/arcblock-code-testing/blob/main/screenshots/result-pc.png"  alt=""/>
<p align="center">block1</p>

<img src="https://github.com/FireTable/arcblock-code-testing/blob/main/screenshots/result-pc.png"  alt=""/>
<p align="center">block2</p>

## 项目简介

* 使用 vue2 static 的相关模板
* 使用 [ant-design-vue] 作为主要组件库
* 使用 [scss] 使用mixins，可通过参数配置通用css属性
* 使用 [lodash、moment] 第三方工具库
* 使用 [jest] 编写单元测试（初次使用，暂只测试了utils里的）


## 主要目录解释
```bash
blocklet-coding-test
├─ babel.config.js            //babel配置
├─ blocklet.md
├─ blocklet.yml
├─ index.html
├─ jest.config.js             //jest配置
├─ package-lock.json
├─ package.json
├─ scripts
│  └─ bump-version.mjs
├─ src                        //代码目录
│  ├─ App.vue
│  ├─ assets                  //样式
│  │  ├─ common.css
│  │  ├─ logo.png
│  │  ├─ mixins.scss
│  │  └─ reset.css
│  ├─ components              //组件
│  │  └─ headerComponent
│  │     └─ index.vue
│  ├─ main.js
│  ├─ pages                   //页面
│  │  └─ blockInfo
│  │     ├─ detail.vue
│  │     └─ index.vue
│  ├─ static
│  │  └─ column.js
│  └─ utils                   //工具方法
│     ├─ request.js           //axios请求初步封装
│     ├─ utils.js             //通用方法
│     └─ utils.test.js        //通用方法单元测试
```

## 如何使用

```bash
# 首先找一个你喜欢的目录
git clone https://github.com/FireTable/arcblock-code-testing.git

# 进入目录
cd ./block-code-testing

# 安装依赖
yarn

# 本地启动: 
# 安装依赖
npm install
# blocklet启动
blocklet dev

# 运行测试
npm test

# 编译成生产环境的代码
npm run build

# 打包成一个 blocklet
blocklet bundle

# 发布到本地 abtnode
blocklet deploy

```

## 部分模块的操作说明
* 右上方的向右图标，可点金查看下一个block
* 带有复制图标的都可进行复制
