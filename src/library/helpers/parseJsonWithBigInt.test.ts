import parseBigInt from './parseJsonWithBigInt';

describe('parseBigInt', () => {
  it('should correctly parse an object without bigint values', () => {
    const obj = { name: 'John', age: 30 };
    expect(parseBigInt(obj)).toEqual(obj);
  });

  it('should convert bigint values to strings in an object', () => {
    const objWithBigInt = { id: BigInt(12345678901234567890n), amount: BigInt(100) };
    const expected = { id: '12345678901234567890', amount: '100' };
    expect(parseBigInt(objWithBigInt)).toEqual(expected);
  });

  it('should handle arrays with mixed types, including bigint', () => {
    const mixedArray = [1, 'hello', BigInt(12345678901234567890n)];
    const expectedArray = [1, 'hello', '12345678901234567890'];
    expect(parseBigInt(mixedArray)).toEqual(expectedArray);
  });
});
