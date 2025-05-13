import { nanoid } from 'nanoid';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('activities').del();

  await knex('activities').insert([
    {
      id: nanoid(24),
      when: '2025-05-05',
      category: 'dvzGcmLVGCYvKXYR5xeh2KBW',
      title: '',
      comment: '',
      duration: 74,
      distance: 5100,
      pace: 60,
      elevation: 21,
      calories: 420,
      heartrate: 75,
      cadence: 0,
    },
    {
      id: nanoid(24),
      when: '2025-05-01',
      category: 'DUjdvCHRTX9pYar3IwgozYe9',
      title: '',
      comment: '',
      duration: 37,
      distance: 0,
      pace: 0,
      elevation: 0,
      calories: 310,
      heartrate: 70,
      cadence: 0,
    },
  ]);
}
