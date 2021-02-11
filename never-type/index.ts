/*
 * @Author: wsx
 * @Date: 2021-02-10 20:47:16
 * @LastEditTime: 2021-02-10 23:04:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-x/never-type/index.ts
 */

// never是指没法正常结束返回的类型，一个必定会报错或者死循环的函数会返回这样的类型
function test1(): never {
    throw new Error('error message')  // throw error 返回值是never
}

function test2() : never {
    while(true) {     // 这个死循环的也无法正常退出
           
    }
}

function test3() : never {
    let count =1
    while(count) {
        count++
    }          // Error: 这个无法将返回值定义为never,因为无法在静态编译阶段直接识别出
}

// 还有就是永远没有相交的类型
type human = 'boy' & 'girl'  // 这两个单独的字符串类型并不可能相交，故human为never类型

// 不过任何类型联合上never类型, 还是原来的类型 
type language = 'ts' | never

// 关于never有如下特性
// 在一个函数中调用了返回never的函数后，之后的代码都会变成deadcode
function test() {
    test1(); // 这里的foo指上面返回了never的函数
    console.log(111)   // Error:编译器报错，此行代码永远不会执行到
    
}


// 无法将其他类型赋值给never类型。
let n: never;
let o: any = {};
n = o;  // 不能将非never类型赋值给never类型，包括any









