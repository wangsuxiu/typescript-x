/*
 * @Author: wsx
 * @Date: 2021-02-15 22:23:08
 * @LastEditTime: 2021-02-15 22:44:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-x/项目实战/index.ts
 */

 // Q: 编好使用interface还是type来定义类型
 // A: 从用法上来说两者本质上没有什么区别，大家使用React做项目开发的话，主要就是用来定义Props以及接口数据类型
 // 但是从扩展的角度来说，type 比interface更方便扩展一些，假如有以下两个定义：
 type Name = {name: string}
 interface IName {
     name: string
 }
 // 想要做类型扩展的话，type 只需要一个&，而interface要多写不少代码
 type Person = Name & {age: number}
 interface IPerson extends IName {
     age: number;
 }

 // 另外type 有一些interface 做不到的事情，比如使用 | 进行枚举类型的组合，使用typeof获取定义的类型等
 // 不过interface又一个强大的功能就是可以重复添加定义属性，比如我们需要给window对象添加一个自定义的属性或方法，那我们直接基于其interface新增属性就可以了
 declare global {
     interface Window {
         MyNameSpace: any
     }
 }

 // Q: 类型定义文件(.d.ts)如何放置
//  A: 临时的类型，直接在使用时定义
// 比如自己写了一个组件内部的Helper， 函数的入参和出参只供内部使用也不存在复用的可能，可以直接在定义函数的时候就在后面定义
function format(input: {k: string}[]): number[] { /***/ }

// 组件个性化类型，直接定义在 ts(x)文件中
// 如 AntD 组件设计，每个单独组件的 Props、State 等专门定义了类型并 export 出去。

// Table.tsx
export type TableProps = { /***/ }
export type ColumnProps = { /***/ }
export default function Table() { /***/ }
// 这样使用者如果需要这些类型可以通过 import type 的方式引入来使用。

// 范围/全局数据，定义在.d.ts 文件中

// 全局类型数据，这个大家毫无异议，一般根目录下有个 typings 文件夹，里面会存放一些全局类型定义。
// 假如我们使用了 css module，那么我们需要让 TS 识别.less 文件(或者.scss)引入后是一个对象，可以如此定义：
declare module '*.less' {
    const resource: { [key: string]: string };
    export = resource;
}

// 而对于一些全局的数据类型，如后端返回的通用的数据类型，我也习惯将其放在 typings 文件夹下，使用 Namespace 的方式来避免名字冲突，如此可以节省组件 import 类型定义的语句
// declare namespace EdgeApi {
    declare namespace EdgeApi {
        interface Department {
          description: string;
          gmt_create: string;
          gmt_modify: string;
          id: number;
          name: string;
        }
      }

  // 这样，每次使用的时候，只需要const department: EdgeApi.Department即可，节省了不少导入的精力。开发者只要能约定规范，避免命名冲突即可。


