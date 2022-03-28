import delay from 'delay';
import { promiseAll } from '../homework/promiseAll';

describe('promiseAll', () => {
  it('promiseAll, 01', async() => {
    expect.assertions(1);
    const result = promiseAll([
      Promise.reject('test_error'),
      Promise.resolve('test_value')
    ]);

    await expect(result).rejects.toBe('test_error');
  });

  it('promiseAll, 02', async() => {
    expect.assertions(1);
    const result = promiseAll([
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3)
    ]);

    await expect(result).resolves.toEqual([1, 2, 3]);
  });

  it('promiseAll, 03', async() => {
    expect.assertions(1);
    const result = promiseAll([
      delay.reject(50, { value: 10 }),
      delay(50, { value: 2 }),
      Promise.resolve(3)
    ]);

    await expect(result).rejects.toBe(10);
  });

  it('promiseAll, 04', async() => {
    expect.assertions(1);
    const result = promiseAll([
      delay(50, { value: 1 }),
      delay(100, { value: 2 }),
      Promise.resolve(3)
    ]);

    await expect(result).resolves.toEqual([1, 2, 3]);
  });

  it('promiseAll, 05', async() => {
    expect.assertions(1);
    const result = promiseAll([1, 2]);

    await expect(result).resolves.toEqual([1, 2]);
  });
});