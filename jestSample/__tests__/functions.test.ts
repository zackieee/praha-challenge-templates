// todo: ここに単体テストを書いてみましょう！
import { sumOfArray } from './../functions';
import { asyncSumOfArray } from './../functions';
import { asyncSumOfArraySometimesZero } from './../functions';
import { getFirstNameThrowIfLong } from './../functions';
import { NameApiService} from './../nameApiService';
import { DatabaseMock } from "./../util";

// sumOfArray //
test('sumOfArray - 正常系', () => {
    expect(sumOfArray([1, 2])).toBe(3);
});

test('sumOfArray - 異常系', () => {
  try {
    sumOfArray([]);
  } catch (error){
    expect(error.message).toMatch('Reduce of empty array with no initial value');
}});

// asyncSumOfArray //
test('asyncSumOfArray - 正常系', async () => {
  expect(await asyncSumOfArray([1, 2])).toBe(3)
});

test('asyncSumOfArraySometimesZero', async () => {
  try {
    await asyncSumOfArray([]);
  } catch (error) {
    expect(error.message).toMatch('Reduce of empty array with no initial value');
  }
});

// asyncSumOfArraySometimesZero //
test('asyncSumOfArraySometimesZero - 正常系', async () => {
  jest.spyOn(DatabaseMock.prototype, 'save').mockReturnValue();
  expect(await asyncSumOfArraySometimesZero([1, 2])).toBe(3)
})

test('asyncSumOfArraySometimesZero - 異常系', async () => {
  jest.spyOn(DatabaseMock.prototype, 'save').mockReturnValue;
  try {
    expect(await asyncSumOfArraySometimesZero([])).toBe(0)
  } catch (error){
    expect(error.message).toMatch('Reduce of empty array with no initial value');
  }
})

test('asyncSumOfArraySometimesZero - 異常系', async () => {
  jest.spyOn(DatabaseMock.prototype, 'save').mockReturnValue();
  try {
    expect(await asyncSumOfArraySometimesZero([])).toBe(0)
  } catch (error) {
    expect(error.message).toMatch('fail!');
  }
})

// getFirstNameThrowIfLong //
test('getFirstNameThrowIfLong - 正常系', async () => {
  jest.spyOn(NameApiService.prototype, 'getFirstName').mockResolvedValue('yuckieee')
  expect(await getFirstNameThrowIfLong(8)).toBe('yuckieee')
})

test('getFirstNameThrowIfLong - 異常系', async () => {
  jest.spyOn(NameApiService.prototype, 'getFirstName').getMockImplementation();
  try{
    await getFirstNameThrowIfLong(7)
  } catch (error) {
    expect(error.message).toMatch('first_name too long');
  }
})
