/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('categories').del();

  await knex('categories').insert([
    {
      id: '4146edee-5e57-4399-b7f4-54de1ff977d2',
      name: 'Badminton',
    },
    {
      id: '841569a4-4878-4be6-8b8b-f583fedc42b6',
      name: 'Cycling',
    },
    {
      id: 'f18addee-d293-4d78-840c-1a4540432fd5',
      name: 'Running',
    },
    {
      id: '20da171e-1f15-4e21-bf47-0d9567acca32',
      name: 'Strength Training',
    },
    {
      id: '072f7767-99ac-4455-8601-26f225742cf2',
      name: 'Treadmill',
    },
    {
      id: '3c72842a-6732-4e8e-842a-36e0b59077fd',
      name: 'Walking',
    },
  ]);
}
