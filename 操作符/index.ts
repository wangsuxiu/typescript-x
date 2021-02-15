/*
 * @Author: wsx
 * @Date: 2021-02-11 11:42:35
 * @LastEditTime: 2021-02-11 20:27:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-x/操作符/index.ts
 */

 // 键值获取keyof
 // keyof 可以返回一个类型所有键值
 type Person = {
     name: string;
     age: number;
 }

 type PersonKey = keyof Person;   // pesonKey得到的类型是name | age

 // keyof 的一个典的用途是限制访问对象的key合法化，因为any做索引是不被接受的，
 function getValue(p: Person, k: keyof Person){
        return p[k]
 }

 // 总结起来keyof 的语法格式如下
 
 // 类型 = keyof 类型

 // 实例类型获取typeof
 // typeof是获取一个对象/实例的类型，如下
 const me: Person = {name: 'gzx', age: 16}
 type p = typeof me;   // {name: string; age: number | undefined}
 const you: typeof me = {name: 'fdfd', age: 69}  // 可以通过编译
 
 // typeof只能用在具体的对象上，这与js中的typeof是一致的，并且它会根据左侧值自动决定应该执行哪种行为。
 const typestr = typeof me;   // typestr的值为“object”
 // typeof可以和keyof一起使用(因为typeof是返回一个类型嘛)，如下：
 type PersonKey1 = keyof typeof me // 'name' | 'age'

 //总结起来，typeof的愈发格式如下：
// 类型 = typeof 实例对象

// 遍历属性in
// in只能用在类型的定义当中，可以怼枚举类型进行遍历，如下：
// 这个类型可以将任何类型的键值转换成number类型
type TypeToNumber<T> = {
    [key in keyof T]: number 
}

// keyof 返回泛型t的所有键枚举类型，key是自定义的任何变量名，中间用 in 链接，
// 外围用[]包裹起来(这个是固定搭配)，冒号右侧number将所有的key定义为number类型
// 于是可以这样使用了
const obj: TypeToNumber<Person> = {name: 10, age: 10}
// 总结起来in的语法格式如下
// [自定义变量名 in枚举类型]: 类型

 

  
 

