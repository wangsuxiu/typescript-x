/*
 * @Author: wsx
 * @Date: 2021-02-10 17:45:04
 * @LastEditTime: 2021-02-10 20:44:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-x/void-type/index.ts
 */
// 在ts中，void和undefined 功能类似，可以在逻辑上避免不小心使用了空指针的情况
function test() {}   // 这个空函数没有返回任何值，返回

const a= test()  //  此时a的类型定义为void,你也不能调用a的任何属性方法

// void和undefined类型最大的区别是，你可以理解为undefined是void的一个子集，当你对函数的返回值并不在意时，使用void而不是undefined.
// 举一个React中的实际例子。

//  Parent.tsx
function Parent(): JSX.Element {
    const getValue = () : number => { return 2}
    return <Child getValue={getValue} />
}

// Child.tsx

type Props = {
    getValue: ()=> void  // 这里的void表示逻辑上不关注具体的返回值类型，number, string, undefined都可以。
}

function Child({getValue} : Props) => <div>{getValue()}</div>

