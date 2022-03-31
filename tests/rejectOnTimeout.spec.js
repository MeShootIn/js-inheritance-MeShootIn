import delay from 'delay';
import { rejectOnTimeout } from '../homework/rejectOnTimeout';

describe('rejectOnTimeout', () => {
  it('rejectOnTimeout, 01', async() => {
    expect.assertions(1);
    await expect(rejectOnTimeout(Promise.resolve(10), 100)).resolves.toBe(10);
  });

  it('rejectOnTimeout, 02', async() => {
    expect.assertions(1);
    await expect(rejectOnTimeout(Promise.reject(10), 100)).rejects.toBe(10);
  });

  it('rejectOnTimeout, 03', async() => {
    expect.assertions(1);
    const delayed = delay(100, { value: 10 });

    await expect(rejectOnTimeout(delayed, 50)).rejects.toBe('timeout_error');
  });

  it('rejectOnTimeout, 04', async() => {
    expect.assertions(1);
    const delayed = delay.reject(100, { value: 10 });

    await expect(rejectOnTimeout(delayed, 50)).rejects.toBe('timeout_error');
  });

  it('rejectOnTimeout, 05', async() => {
    expect.assertions(1);
    const delayed = delay(100, { value: 10 });

    await expect(rejectOnTimeout(delayed, 1000)).resolves.toBe(10);
  });

  it('rejectOnTimeout, 06', async() => {
    expect.assertions(1);
    const delayed = delay.reject(100, { value: 'error' });

    await expect(rejectOnTimeout(delayed, 1000)).rejects.toBe('error');
  });
});
