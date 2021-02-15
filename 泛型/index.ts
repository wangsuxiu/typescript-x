/*
 * @Author: wsx
 * @Date: 2021-02-11 20:44:37
 * @LastEditTime: 2021-02-15 22:18:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-x/泛型/index.ts
 */
// 基本使用
// 泛型可以在普通类型定义，类定义，函数定义上，如下：
// 普通类型定义
type Dog<T> = {name: string, type: T}
// 普通类型使用
const dog: Dog<number> = {name: 'ww', type: 20}

// 类定义
class Cat<T>{
    private type: T;
    constructor(type: T){
        this.type = type;
    }
}

// 类使用
const cat: Cat<number> = new Cat<number>(20) // 或者简写成 const cat = new Cat(20)

// 函数定义
function swipe<T,U>(value:[T, U]): [U, T] {
   return [value[1], value[0]] 
}

// 函数使用
swipe<Cat<number>, Dog<number>>([cat, dog])  // 或简写成swipe([cat, dog])

// 注意，如果对一个类型名定义了泛型，那么使用此类型名的时候一定要把泛型类型也写上去
// 而对于变量来说，它的类型可以在调用时推断出来的话，就可以省略泛型书写。

// 泛型的语法格式简单总结如下：
// 类型名<泛型列表> 具体类型定义


// 泛型推导与默认值
// 上面提到了 ，我们可以简化对泛型类型定义的书写，因为ts会自动根据变量定义时的类型推导
// 出变量类型，这一般是发生在函数调用的场合的。

type Dog1<T> = { name: string; type: T}
function adopt<T>(dog: Dog1<T>){
    return dog;
}

const dog3 = {name: 'ww', type: 'hsq'} // 这里按照Dog类型的定义一个type为string的对象 
adopt(dog3) // Pass: 函数会根据入参类型推断出type为string


// 若不适用函数泛型推导，我们若需要定义变量类型则必须指定泛型类型。
const dog4:Dog<string> = {name: 'ww', type: 'hsq'} // 不可省略<string>这部分

// 如果我们想不指定，可以使用泛型默认值的方案。
type Dog5<T = any> = {
    name: string;
    type: T
}

const dog6 : Dog5 = { name: 'ww', type: 'hsq'}

dog6.type = 123 // 不过这样type类型就是any了，无法自动推导出来，失去了泛型的意义

// 泛型默认值的语法格式接单总结如下
// 泛型名 = 默认类型

// 泛型约束
//  有的时候我们可以不用关注泛型具体的类型，如：
function fill<T>(length: number, value: T): T[]{
    return new Array(length).fill(value)
} 

// 这个函数接受一个长度参数和默认值，结果就是生成使用默认值填充好对应个数的数组
// 我们不用对传入的参数做判断，直接填充就行了，但是有时候，我们需要限定类型，这时候使用extends关键字即可
function sum<T extends number>(value: T[]){
    let count = 0;
    value.forEach(v=> count+= v)
    return count;
}

// 这样你就可以以sum([1,2,3])这种方式调用求和方式，而像sum(['1', '2'])这种是无法通过编译的
// 泛型约束也可以用在多个泛型参数的情况。
function pick<T, U extends keyof T>(){
};

// 这里的意思是限制了u一定是T的key类型的子集，这种用法常常出现在一些泛型工具库中
// extends的语法格式如下，注意下面的类型可以是一般意义上的类型也可以是泛型。
// 泛姓名 extends 类型

// 泛型条件，
// 上面提到extends，其实也可以当作一个三元运算符，如下：

// T extends U ? X: Y 

// 这里便不限制t一定要是U的子类型，如果是U的子类型，则将T定义为x类型，否则定义为Y类型。
// 注意分配的结果是分配式的
// 举个例子，如果我们把X换成T,如此形式: T extends U? T: never
// 此时返回的T, 是满足原来的T中包含U的部分，可以理解为T和U的交集
// 所以extends的语法格式可以扩展为
// 泛型名A extends 类型B ? 类型c : 类型D


// 泛型推断infer
// infer的中文是‘推断’的意思，一般是搭配上面的泛型条件语句使用，
// 所谓推断,就是你不用预先指定在泛型列表中，在运行时会自动判断，不过你得预先定义好整体的结构
 type Foo<T> = T extends {t: infer Test} ? T: string
 // 首先看extends后面的内容，{t: infer Test}可以看成是一个包含t属性的类型定义，这个 t属性的value类型
 // 通过infer进行推断后会赋值给Test类型，如果泛型实际参数符合{t: infer Test}
 // 的定义那么返回的就是Test类型，否则默认给缺省的string类型。

 // 举个例子加深下理解
 
 type One = Foo<number>   //string,因为number不是一个包含t的对象类型
 type Two = Foo<{t: boolean}> // boolean,因为泛型参数匹配上了，使用了infer对应的type
 type three = Foo<{a: number, t: () => void}>  // ()=> void,泛型定义是参数的子集，同样适配
 // infer用来对满足的泛型类型进行子类型的抽取，有很多高级的类型泛型工具也巧妙的使用了这个方法

 // 泛型工具
//  Partical<T>

 //此工具的作用就是将泛型中全部属性变为可选的
 type Partial1<T> = {
     [key in keyof T]?: T[key]
 }

 // 举个例子，这个类型定义在下面也会用到
 type Animal = {
    name: string;
    category: string;
    age: number;
    eat: () => number;
 }

 // 使用Partical包裹一下
 type PartOfAnimal = Partial1<Animal>
 const ww: PartOfAnimal = {name: 'ww'}  // 属性全部可选后，可以只赋值部分属性了


 // Record<K,T> 
 // 此工具的作用是将k中所有属性值转化为T类型，我们常用它来声明一个普通object对象
 type Record1<K extends keyof any, T> = {
    [key in K]: T
 }
// 这里特别说明一下，keyof any对应的类型为number | tring | symbol,也就是可以做对象键（专业说法叫索引index）的类型集合
// 举个例子
const obj1: Record<string, string> = {'name': 'mbg','tag': '年轻人不讲伍德'}

// Pick<T, K> 
// 此工具的作用是将T类型中的k键列表提取出来，生成新的子键值对类型
type Pick1<T, K extends keyof T> = {
    [P in K]:T[P] 
}

// 我们还是用上面的Animal定义，看一下Pick如何使用。
const bird :Pick1<Animal, "name" | "age"> = {name: 'bird', age: 1}

// Exclude<T, U>
// 此工具是在t类型中，去除T类型和u类型的交集，返回剩余的部分。
type Exclude1<T, U> = T extends U ? never : T

// 注意这里的extends返回的T是原来的T中和U无交集的部分，而任何属性联合never都是自身。

// 举个例子
type T1 = Exclude1<'a' | 'b' | 'c', 'a' | 'b'>   // 'c'
type T2 = Exclude<string | number | (()=> void), Function>   // string | number

// Omit<T, K>
// 此工具可认为是适用于键值对对象的Exclude,它会去除类型T中包含K的键值对
type Omit1 = Pick1<T, Exclude<keyof T, K>>

// 在定义中，第一步先从T的key中去掉与k重叠key，接着使用Pick把T类型和剩余的key组合起来即可。


// 还是用上面的Animal举个例子。
const OmitAnimal: Omit1<Animal, 'name' | 'age'> = {category: 'lion', eat: ()=> {console.log('eat')}}

// 可以发现，Omit和Pick得到的结果安全相反，一个是取非结果，一个是取交结果

// ReturnType<T>
// 此工具就是获取T类型（函数）对应的返回值类型。
type ReturnType1<T extends (...args: any) => any> = T extends (...args : any) => infer R ? R: any
// 看源码其实有点多，其实可以稍微简化成下面的样子：
type ReturnType2<T extends func> = T extends () => infer R ? R : any

//  通过使用infer推断返回值类型，然后返回此类型，如果你彻底了解infer的含义，那这段就很好理解
// 举个例子
function foo3(x: string | number): string | number{
    return ''
}
type foo3Type  = ReturnType1<foo3>   // string | number

// Required<T>




 





 






