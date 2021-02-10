/*
 * @Author: wsx
 * @Date: 2021-02-10 15:44:56
 * @LastEditTime: 2021-02-10 17:44:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-x/basic-type/unknownTest.ts
 */
const num: number = 10;
(num as unknown as string).split('') // 相当于any


const foo: unknown = 'string'
foo.substr(1) // Error: 静态检查不通过报错
const bar: any = 10
bar.substr(1) // Pass: any类型相当于放弃了静态检查


// unknown 类型的一个使用场景就是，规避any类型带来的忽略静态检查带来的bug
function test(input: unknown): number{
    if(Array.isArray(input)) {
        return input.length  // Pass: 这个代码块中，类型守卫已经将input判断为array类型
    } 

    return input.length // Error: 这里的input还是unknown类型，静态检查报错，如果入参是any，则会放弃检查直接成功，带来报错风险
}

