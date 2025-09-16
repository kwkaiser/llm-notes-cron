import assert from 'node:assert';
import { describe, test } from 'node:test';

import { add, delay, fetchUserData, formatGreeting, isEven, multiply } from './utils.js';

describe('Math utilities', () => {
  test('add function should correctly add two numbers', () => {
    assert.strictEqual(add(2, 3), 5);
    assert.strictEqual(add(-1, 1), 0);
    assert.strictEqual(add(0, 0), 0);
  });

  test('multiply function should correctly multiply two numbers', () => {
    assert.strictEqual(multiply(2, 3), 6);
    assert.strictEqual(multiply(-2, 3), -6);
    assert.strictEqual(multiply(0, 5), 0);
  });

  test('isEven should correctly identify even numbers', () => {
    assert.strictEqual(isEven(2), true);
    assert.strictEqual(isEven(3), false);
    assert.strictEqual(isEven(0), true);
    assert.strictEqual(isEven(-2), true);
    assert.strictEqual(isEven(-3), false);
  });
});

describe('String utilities', () => {
  test('formatGreeting should format greeting without title', () => {
    const result = formatGreeting('John');
    assert.strictEqual(result, 'Hello, John!');
  });

  test('formatGreeting should format greeting with title', () => {
    const result = formatGreeting('Smith', 'Dr.');
    assert.strictEqual(result, 'Hello, Dr. Smith!');
  });

  test('formatGreeting should handle empty title', () => {
    const result = formatGreeting('Jane', '');
    assert.strictEqual(result, 'Hello, Jane!');
  });
});

describe('Async utilities', () => {
  test('delay should wait for specified time', async () => {
    const start = Date.now();
    await delay(50);
    const end = Date.now();
    const elapsed = end - start;

    // Allow some tolerance for timing
    assert.ok(elapsed >= 45 && elapsed <= 100, `Expected delay around 50ms, got ${elapsed}ms`);
  });

  test('fetchUserData should return user data for valid ID', async () => {
    const result = await fetchUserData('123');
    assert.deepStrictEqual(result, {
      id: '123',
      name: 'User 123',
    });
  });

  test('fetchUserData should throw error for invalid ID', async () => {
    await assert.rejects(
      async () => {
        await fetchUserData('invalid');
      },
      {
        name: 'Error',
        message: 'User not found',
      },
    );
  });

  test('fetchUserData should handle concurrent requests', async () => {
    const promises = [fetchUserData('user1'), fetchUserData('user2'), fetchUserData('user3')];

    const results = await Promise.all(promises);

    assert.strictEqual(results.length, 3);
    assert.strictEqual(results[0].id, 'user1');
    assert.strictEqual(results[1].id, 'user2');
    assert.strictEqual(results[2].id, 'user3');
  });
});

describe('Edge cases', () => {
  test('should handle large numbers', () => {
    const largeNum1 = 999999999;
    const largeNum2 = 1000000001;
    assert.strictEqual(add(largeNum1, largeNum2), 2000000000);
  });

  test('should handle floating point numbers', () => {
    assert.strictEqual(add(0.1, 0.2), 0.30000000000000004); // JavaScript floating point precision
    assert.ok(Math.abs(add(0.1, 0.2) - 0.3) < 0.0001); // More practical assertion
  });

  test('should handle special string characters', () => {
    const result = formatGreeting('José', 'Sr.');
    assert.strictEqual(result, 'Hello, Sr. José!');
  });
});
