//CourseManagementAdd
import React from 'react';
// import 'antd/dist/antd.min.css';

// class Analysisprocessing extends React.Component {

//   componentWillMount() { }

//   componentDidUpdate(pre) { }

//   selectChange = (e) => {
//     const { porObj } = this.state;
//     const str = porObj[e.key];
//     this.setState({
//       porturl: str,
//       selectedKeys: e.selectedKeys
//     });
//   }

//   render() {

//     return (
//       <div>ssssffff</div>

//     );
//   }
// }
// export { Analysisprocessing };
//第一种写法
// export interface HelloProps {
//   compiler: string;
//   framework: string
// }

// export const Hello = (props: HelloProps) => <h1>Hello from{props.compiler} and {props.framework}!</h1>
//第二种写法
enum Color {
  red = 1,
  Green,
  Blue
}
export interface HelloProps {
  compiler: string;
  framework: string;
  curColor: Color;
}

interface labelvalue {
  label: string;
}
interface SquareConfig {
  color?: string;
  width: number;
  // [otherName: string]: any
}
//函数接口类型
interface SearchFn {
  (source: string, subString: string): boolean;
}
//索引类型
interface StringArray {
  [index: number]: string;
}

//类类型
//class 中constructor方法，是构造方法
//而this关键字则代表实例对象。
//创建一个函数  自动获得一个prototype属性,该属性指向函数的原型对象，所有原型对象都会自动获得一个constructor属性，该属性是指向prototype所在函数的指针
// ClockConstructor为构造函数所用
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}
// ClockInterface 为实例方法所用。
interface ClockInterface {
  tick(): any;
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {}
}

function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): ClockInterface {
  return new ctor(hour, minute);
}

let digital = createClock(DigitalClock, 12, 17);

//接口继承
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}
//当你在TypeScript里使用JSX时，只有as语法断言是被允许的。
// let square = <Square>{};
let square = {} as Square;
square.color = 'red';

//混合类型
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = function(start: number) {
    let sss = 'dd';
  } as Counter;
  counter.interval = 123;
  return counter;
}

let c = getCounter();

//类
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return 'hello,' + this.greeting;
  }
}

let greeter = new Greeter('消息消息消息');

//类的继承
// class Animal {
//   name: string;
//   // curtype: string = 'cc';
//   constructor(theName: string) { this.name = theName; }
//   move(distanceInMeters: number = 0) {
//     console.log(`${this.name} moved ${distanceInMeters}m.`);
//   }
// }

// class Snake extends Animal {
//   constructor(name: string) { super(name) };
//   move(distanceInMeters = 5) {
//     console.log("Slithering...");
//     super.move(distanceInMeters);
//   }

// }

// class Horse extends Animal {
//   constructor(name: string) { super(name); }
//   curtype: string = 'cc';
//   move(distanceInMeters = 45) {
//     console.log("Galloping...");
//     super.move(distanceInMeters);
//   }
// }

// let sam = new Snake("Sammy the Python");
// let tom: Animal = new Horse("Tommy the Palomino");

//类的私有
class Animal {
  private name: string;
  protected typename: string;
  constructor(theName: string, typename: string) {
    this.name = theName;
    this.typename = typename;
  }
}

class Rhino extends Animal {
  constructor() {
    super('Rhino', 'aa');
  }
  rich() {
    // console.log('受保护的Rhino ' + this.typename)
  }
}

class Employee {
  private name: string;
  constructor(theName: string) {
    this.name = theName;
  }
}

let animal = new Animal('Goat', 'bb');
let rhino = new Rhino();
let employee = new Employee('Bob');

//类的静态属性
//静态成员，这些属性存在于类本身上面而不是类的实例上
class Grid {
  static origin = { x: 10, y: 10 };
  constructor(scale: number) {
    // console.log(Grid.origin)
  }
}

let grid1 = new Grid(20);

//抽象类
//抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化,可以通过继承然后实例化子类

abstract class Department {
  constructor(public name: string) {}

  printName(): void {
    // console.log('Department name: ' + this.name);
  }

  abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {
  constructor() {
    super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
  }

  printMeeting(): void {
    // console.log('The Accounting Department meets each Monday at 10am.');
  }

  generateReports(): void {
    // console.log('Generating accounting reports...');
  }
}

let department: Department; // 允许创建一个对抽象类型的引用
// department = new Department(); // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
// department.generateReports(); // 错误: 方法在声明的抽象类中不存在

class Greeters {
  static standardGreeting = 'Hello, there';
  greeting: string = '';
  greet() {
    if (this.greeting) {
      return 'Hello, ' + this.greeting;
    } else {
      return Greeters.standardGreeting;
    }
  }
}
//实例
// let greeter1: Greeters;
// greeter1 = new Greeters();
//当你在TypeScript里声明了一个类的时候，实际上同时声明了很多东西。
//  1. 就是类的 实例的类型 2. 构造函数的值
// constructor(message: string) {
//   this.greeting = message;
// }
//这个函数会在我们使用 new创建类实例的时候被调用

//类定义会创建两个东西：类的实例类型和一个构造函数。因为类可以创建出类型，所以你能够在允许使用接口的地方使用类。

//typeof Greeter，意思是取Greeter类的类型，而不是实例的类型。
//这个类型包含了类的所有静态成员和构造函数
let greeterMaker: typeof Greeters = Greeters;

let greeter2: Greeters = new greeterMaker();
// let greeter2: Greeters = new greeterMaker();
// console.log(greeter2.greet());

// class Greeter {
//   static standardGreeting = "Hello, there";
//   greeting: string = '';
//   greet() {
//     if (this.greeting) {
//       return "Hello, " + this.greeting;
//     }
//     else {
//       return Greeter.standardGreeting;
//     }
//   }
// }

// let greeter1: Greeter;
// greeter1 = new Greeter();
// console.log(greeter1.greet());

// let greeterMaker: typeof Greeter = Greeter;
// greeterMaker.standardGreeting = "Hey there!";

// let greeter2: Greeter = new greeterMaker();
// console.log(greeter2.greet());

//接口继承类
class Control {
  private state: any;
}
interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() {}
}

class TextBox extends Control {
  select() {}
}

class Image extends Control implements SelectableControl {
  select() {}
}

//泛型类
interface Lenthwise {
  length: number;
}
function loggingIdentity<T extends Lenthwise>(arg: T): T {
  console.log('argd');
  console.log(arg.length);
  return arg;
}

loggingIdentity({ a: 'cc', length: 3 });

// function getProperty<T,K>(obj: T, key: K) {
//   return obj[key];
// }

// let x = { a: 1, b: 2, c: 3, d: 4 };

// getProperty(x, "a");
// getProperty(x, "m");

//在泛型里使用类类型
// function create<T>(c: { new(): T; }): T {
//   return new c()
// }

//使用原型属性推断并约束构造函数与类实例的关系
//类

// class ZooKeeper {
//   nametag: string;
// }

// class Animals {
//   numLegs: number;
// }

// class Lion extends Animals {
//   keeper: ZooKeeper
// }

// function createInstance<A extends Animals>(c: new () => A): A {
//   return new c();
// }
// createInstance(Lion).keeper.nametag;  // typechecks!
// console.log('类型推断')
// console.log(createInstance(Lion))

//枚举
//数字枚举可以在计算和常量中混合使用,
//不带初始化器的成员要么放在第一位，要么放在数字或者常量成员的后面
enum Diretion {
  Up,
  Down,
  Left,
  Right
}

enum Response {
  NO = 3,
  Yes = 5
}
function getSomeValue(): number {
  return 1;
}
// enum E {
//   B,
//   A = getSomeValue(),

// }
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = 'Yes'
}

// enum Direction {
//   Up = "UP",
//   Down = "DOWN",
//   Left = "LEFT",
//   Right = "RIGHT",
// }
// enum D { X }

// enum E {
//   Foo,
//   Bar
// }

enum E {
  x,
  y,
  z
}
function f(obj: { x: number }) {
  return obj.x;
}

f(E);
//常量枚举
//大多数情况下，枚举是十分有效的方案。 然而在某些情况下需求很严格。
//1.它们在编译阶段会被删除
//2.不允许包含计算成员
// const enum Enum {
//   A = 1,
//   B = A * 2
// }
// let bb = Enum.A
//它们在编译阶段会被删除。所以console 有问题 这适用于跨模块枚举。没有办法将导入enum转换为标识符或类型以外的其他内容。
// export const enum Directions {
//   Up,
//   Down,
//   Left,
//   Right
// }
// // let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]

export class Hello extends React.Component<HelloProps, {}> {
  printLabel = (labelObj: labelvalue) => {
    return labelObj.label;
  };
  createSquare = (config: SquareConfig): { color: string; area: number } => {
    let newSquare = { color: 'ssss', area: 100 };
    return newSquare;
  };

  render() {
    return <h1>hello</h1>;
  }
}
