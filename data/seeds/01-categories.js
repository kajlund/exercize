import { nanoid } from 'nanoid';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('categories').del();

  await knex('categories').insert([
    {
      id: nanoid(24),
      name: 'Badminton',
    },
    {
      id: nanoid(24),
      name: 'Cycling',
    },
    {
      id: nanoid(24),
      name: 'Running',
    },
    {
      id: nanoid(24),
      name: 'Strength Training',
    },
    {
      id: nanoid(24),
      name: 'Treadmill',
    },
    {
      id: nanoid(24),
      name: 'Walking',
    },
  ]);
}
