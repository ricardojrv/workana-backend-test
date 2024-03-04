/* eslint-disable @typescript-eslint/no-explicit-any */
const parseBigInt = (item: any) => JSON.parse(
  JSON.stringify(item, (_key, value) => typeof value === 'bigint' ? String(value) : value),
  (_key, value) => {
    if (typeof value === 'string' && /^\d+n$/.test(value)) {
      return BigInt(value.slice(0, -1));
    }
    return value;
  },
);

export default parseBigInt;