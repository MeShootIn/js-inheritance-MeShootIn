import { flatMapPolyfill } from '../homework/flatMap';

describe('flatMap', () => {
  it('flatMap polyfill', () => {
    const original = {
      writable: true,
      enumerable: false,
      configurable: true
    };

    // eslint-disable-next-line
    Array.prototype.flatMap = function flatMap() {
      throw new Error('Nope');
    };

    // eslint-disable-next-line
    Array.prototype.flat = function flat() {
      throw new Error('Nope');
    };

    class PseudoArray extends Array {}

    flatMapPolyfill(PseudoArray);

    expect(
      Object.prototype.hasOwnProperty.call(PseudoArray.prototype, 'flatMap')
    ).toBeTruthy();

    const { value: _, ...descriptor } = Object.getOwnPropertyDescriptor(
      PseudoArray.prototype,
      'flatMap'
    );

    expect(descriptor).toEqual(original);

    expect(new PseudoArray(1, 2, 3, 4).flatMap(x => [x * 2])).toEqual(
      new PseudoArray(2, 4, 6, 8)
    );

    expect(
      new PseudoArray("it's Sunny in", '', 'California').flatMap(x => x.split(' '))
    ).toEqual(new PseudoArray("it's", 'Sunny', 'in', '', 'California'));

    expect(
      new PseudoArray(1, 2, 3, 4).flatMap((x, index) => [x, index])
    ).toEqual(new PseudoArray(1, 0, 2, 1, 3, 2, 4, 3));

    const context = { t: 1 };

    expect(
      new PseudoArray(1, 2).flatMap(function() {
        return this;
      }, context)
    ).toEqual(new PseudoArray(context, context));
  });
});
