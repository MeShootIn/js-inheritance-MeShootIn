import delay from 'delay';
import { promiseRace } from '../homework/promiseRace';

describe('promiseRace', () => {
  it('promiseRace, 01', async() => {
    expect.assertions(1);
    const result = promiseRace([
      Promise.reject('test_error'),
      Promise.resolve('test_value')
    ]);

    await expect(result).rejects.toBe('test_error');
  });

  it('promiseRace, 02', async() => {
    expect.assertions(1);
    const result = promiseRace([
      delay.reject(100, { value: 'test_error' }),
      delay(50, { value: 'test_value' })
    ]);

    await expect(result).resolves.toBe('test_value');
  });

  it('promiseRace, 03', async() => {
    expect.assertions(1);
    const result = promiseRace([
      delay(100, { value: 1 }),
      delay(50, { value: 2 }),
      delay(25, { value: 3 })
    ]);

    await expect(result).resolves.toBe(3);
  });

  it('promiseRace, 04', async() => {
    expect.assertions(1);
    const result = promiseRace([1, 2]);

    await expect(result).resolves.toBe(1);
  });
});