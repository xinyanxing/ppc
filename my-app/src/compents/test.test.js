import React from 'react';
import { callbackify } from 'util';

function randocall(fn) {
  return fn(Math.floor(Math.random() * 6 + 1));
}

test('randocall calls its callback with a number', () => {
  const mock = jest.fn();
  randocall(mock);
  expect(mock).toBeCalledWith(expect.any(Number));
});

// test('测试 toHaveBeenCalledWith ', () => {
//   const beverage = new LaCroix('orange');
//   register(beverage);
//   const f = jest.fn();
//   applyToAll(f);
//   expect(f).toHaveBeenCalledWith(beverage);
// });
function applyToAllFlavors(Array, callback) {
  Array.forEach(v => {
    callback(v);
  });
}
test('applying to all flavors does mango last', () => {
  const drink = jest.fn();
  applyToAllFlavors(['origian'], drink);
  expect(drink).toHaveBeenLastCalledWith('origian');
});

// const mymock = jest.fn()  //只是一个模拟函数
// mymock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true)
// console.log('mymock')
// console.log(mymock(), mymock(), mymock())
// test('测试这样多个函数调用产生不同的结果时，请使用 mockImplementationOnce 方法', () => {
//   const mymockFn = jest.fn(cb => (null, true));
//   mymockFn((err, val) => console.log(val))
// })

test('总是返回需要mockImplementation）', () => {
  // const mymethod = jest.fn().mockReturnThis()
  const mockFn = jest.fn().mockImplementation(scalar => 42 + scalar);
  // 等同于 jest.fn(scalar => 42 + scalar);

  const a = mockFn(0);
  const b = mockFn(1);

  a === 42; // true
  b === 43; // true

  mockFn.mock.calls[0][0] === 0; // true
  mockFn.mock.calls[1][0] === 1; // true
});
