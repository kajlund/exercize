/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('activities').del();

  await knex('activities').insert([
    {
      id: 'ec5d6863-c127-4978-b8c6-2d5dc0818414',
      activityDate: '2025-05-05',
      categoryId: '3c72842a-6732-4e8e-842a-36e0b59077fd',
      title: 'Lunch Walk',
      comment: 'Walk around the hood during lunch break',
      duration: 2422,
      distance: 3400,
      pace: 11,
      elevation: 16,
      calories: 179,
      heartrate: 104,
      cadence: 119,
    },
    {
      id: 'a02b2eb8-45f5-4153-87ed-65addf958cb1',
      activityDate: '2025-05-02',
      categoryId: '20da171e-1f15-4e21-bf47-0d9567acca32',
      title: 'Afternoon Workout',
      comment: 'Gym session focusing on strength training',
      duration: 2176,
      distance: 0,
      pace: 0,
      elevation: 0,
      calories: 0,
      heartrate: 0,
      cadence: 0,
    },
  ]);
}
