/*
 * @Description: utils通用方法测试
 * @Author: yuanzeyu
 * @Date: 2023-11-01 09:31:31
 * @LastEditTime: 2023-11-01 15:18:20
 */
import { handleHash, handleTime, handleNum, copyTextToClipboard, updateDuration } from './utils'
const { JSDOM } = require('jsdom');

// ---------handleHash的单元测试----------
// 取前四位和后四位显示，中间用-隔开，数字英文都可以
const regexp = /^[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}$/
describe('return hash format', () => {
  // 值为空/null/undefined时都返回--
  test("should return hash as --", () => {
    expect(handleHash('')).toMatch('--')
  })

  test("should return hash as --", () => {
    expect(handleHash(null)).toMatch('--')
  })

  test("should return hash as --", () => {
    expect(handleHash(undefined)).toMatch('--')
  })
  
  test("should return hash as xxxx-xxxx", () => {
    expect(handleHash('00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa')).toMatch(regexp)
  })

  test("should return hash as xxxx-xxxx", () => {
    expect(handleHash('00we0000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffa43')).toMatch(regexp)
  })

  test("should return hash as xxxx-xxxx", () => {
    // 不能有特殊符号
    expect(handleHash('#¥we0000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffa43')).toMatch(regexp)
  })
})
// ---------handleHash的单元测试----------


// ---------handleTime的单元测试----------
// 时间戳格式化成时间，参数为时间戳和时间格式
describe('return time format', () => {
  test("should return time as 'MM/DD/yyyy HH:mm:ss'", () => {
    expect(handleTime(1608620982, 'MM/DD/yyyy HH:mm:ss')).toMatch('12/22/2020 15:09:42')
  })

  test("should return time as 'MMMM/DD/yyyy HH:mm:ss'", () => {
    expect(handleTime(1608620982, 'MMMM/DD/yyyy HH:mm:ss')).toMatch('December/22/2020 15:09:42')
  })
})
// ---------handleTime的单元测试----------


// ---------copyTextToClipboard的单元测试----------
describe('should return text to clipboard', () => {
  // 创建一个全局的 JSDOM 实例
  const { window } = new JSDOM('<!doctype html><html><body></body></html>');

  // 将全局对象的属性添加到 Node.js 的全局对象中
  global.window = window;
  global.document = window.document;
  global.navigator = {
    clipboard: {
      writeText: jest.fn(),
      readText: jest.fn(),
    }
  };
  it("should call clipboard.writeText", async () => {

    // 使用spyOn函数来监视copyTextToClipboard方法
    const writeTextSpy = jest.spyOn(navigator.clipboard, 'writeText');
    
    await copyTextToClipboard("test: have cpoied")

    expect(writeTextSpy).toHaveBeenCalled();
    expect(writeTextSpy.mock.calls[0][0]).toEqual("test: have cpoied");
  });
})
// ---------copyTextToClipboard的单元测试----------


// ---------updateDuration的单元测试----------
test("should return duration", () => {
  // 返回的持续时间为时分秒格式
  const regexp = /^(\d{2,}):(\d{2}):(\d{2})$/
  expect(updateDuration(1608620982)).toMatch(regexp)
})
// ---------updateDuration的单元测试----------