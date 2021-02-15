/*
 * @Author: wsx
 * @Date: 2021-02-10 23:04:58
 * @LastEditTime: 2021-02-10 23:51:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-x/运算符/index.ts
 */


 // 非空断言运算符!
 // 这个运算符可以用在变量名或者函数名之后，用来强调对应的元素是非null| undefined的
 function onClick(callback?: () => void) {
        callback!();
 }
 
 // 你可以查看编译后的es5代码，居然没有做任何防空判断
 function onClick(callback) {
    callback()
 }

 // 这个符号的场景，特别适用于我们明确知道不会返回空值的场景，从而减少冗余的代码判断，如React的ref
 function Demo(): JSX.Element {
     const divRef = useRef<HTMLDivElement>()
     useEffect(()=> {
        divRef.current!.scroolIntoView()
     }, [])
     return <div ref={divRef}>demo</div>
 }


 // 可选链运算符 ?.
 // 相比!上面作用于编译阶段的非空判断，?.这个是开发者最需要的运行时(当然编译时也有效)的非空判断。
 obj?.prop   obj?.[index]  func?.(args)
 //?.用来判断左侧的表达式是否是null | undefined, 如果是则会停止表达式运行，可以减少我们大量的&&运算。

 // 比如我们写出a?.b时，编译器会自动生成如下代码：
 a === null || a === void 0? void 0 : a.b;
// 这里有一个小知识点: undefined 这个值在非严格模式下会被重新赋值，使用void 0必定返回返回真正的undefined

// 空值合并运算符  ??
// ?? 与 || 的功能是相似的
// 区别在于??在左侧表达式结果为null || undefined时，才会返回右侧表达式
// 比如我们书写了 
 let b = a ?? 10
 let b = a!==null && a!== void 0 ? a: 10
 // 而|| 表达式，大家知道的，则对false,'',NaN,0等逻辑空值也会生效，不适合我们做对参数的合并

 // 数字分割符_
 let num:number = 1_2_345.6_78_9
 //_可以用来对长数字做任意的分隔，主要设计是为了便于数字的阅读，编译出来的代码是没有下划线的，请放心食用。
 


 



