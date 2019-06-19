import {
  calcTime,
  convertMoney,
  debounce,
  getQueryStrings,
  getObjectIds,
  replaceSpacesToHyphensFromString,
  throttle,
} from 'lib/helpers';

describe('Helpers', () => {
  test('calcTime should return 1 hour and 0 minutes if time is 60', () => {
    expect(calcTime(60)).toBe('1h 0m');
  });
  test('convertMoney should return number with $ sign in front', () => {
    expect(convertMoney(100)).toBe('$100');
  });
  test('debounce should call function after 1 sec', () => {
    jest.useFakeTimers();
    const func = jest.fn();
    const debouncedFunc = debounce(func, 1000);
    debouncedFunc();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });
  test('throttle should call function after 1 sec', () => {
    jest.useFakeTimers();
    const func = jest.fn();
    const throttledFunc = throttle(func, 1000);
    throttledFunc();
    expect(func).toHaveBeenCalledTimes(1);
  });
  test('getQueryStrings should return query', () => {
    expect(getQueryStrings('?query=littleman')).toBe('littleman');
  });
  test('getObjectIds should return array of strings from object keys', () => {
    expect(getObjectIds({ key1: 'key1' })).toEqual(['key1']);
  });
  test('replaceSpacesToHyphensFromString should return string without spaces', () => {
    expect(replaceSpacesToHyphensFromString('string string')).toBe(
      'string-string',
    );
  });
});
