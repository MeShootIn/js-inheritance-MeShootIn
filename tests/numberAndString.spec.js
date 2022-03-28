import { NumberAndString } from '../homework/numberAndString';

describe('Number and string', () => {
  it('NumberAndString', () => {
    const values = ['hello', 'javascript', 'world'];
    const instances = values.map(str => new NumberAndString(str));

    expect(instances.join(' ')).toBe('hello javascript world');
    expect(instances.reduce((obj, memo) => memo + obj, 0)).toBe(20);
  });
});
