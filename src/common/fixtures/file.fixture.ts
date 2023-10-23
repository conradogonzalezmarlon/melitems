export const fileJSONlFixture = {
  buffer: Buffer.from('{"site":"MLB","id":"1177244737"}'),
  originalname: 'items.jsonl',
};
export const fileJSONFixture = { site: 'MLB', id: '1177244737' };
export const fileArrayJSONFixture = (quantity: number) => new Array(quantity).fill(fileJSONFixture)
export const fileJSONFixture2 = { site: 'HLB', id: '2177244737' };
