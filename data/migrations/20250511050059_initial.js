/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('categories', (table) => {
    table.uuid('id', { useBinaryUuid: false, primaryKey: true });
    table.string('name').notNullable().unique();
    table.timestamps(true, true, true);
  });

  await knex.schema.createTable('activities', (table) => {
    table.uuid('id', { useBinaryUuid: false, primaryKey: true });
    table.date('activityDate').nullable().defaultTo(null);
    table.uuid('categoryId').references('id').inTable('category').onDelete('SET NULL');
    table.string('title').notNullable().defaultTo('');
    table.text('comment').notNullable().defaultTo('');
    table.integer('duration').notNullable().defaultTo(0);
    table.integer('distance').notNullable().defaultTo(0);
    table.double('pace').notNullable().defaultTo(0);
    table.integer('elevation').notNullable().defaultTo(0);
    table.integer('calories').notNullable().defaultTo(0);
    table.integer('heartrate').notNullable().defaultTo(0);
    table.integer('cadence').notNullable().defaultTo(0);

    table.timestamps(true, true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('categories');
  await knex.schema.dropTableIfExists('activities');
}
