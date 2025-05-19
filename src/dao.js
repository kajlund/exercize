import { nanoid } from 'nanoid';

import getLogger from './logger.js';
import getDB from './db.js';

export default function (table = '') {
  const log = getLogger();
  const db = getDB();

  /**
   * Creates a new record in the specified table.
   * @param {object} data - An object containing the data for the new record.
   * @returns {Promise<string>} - A promise that resolves to a string containing the ID of the inserted row.
   */
  async function create(data) {
    try {
      if (!data.id) data.id = nanoid(24);
      log.debug(data, `dao.create for table ${table}:`);
      await db.knex(table).insert(data);
      return data.id;
    } catch (err) {
      log.error(err, `Error creating record in ${table}:`);
      throw err;
    }
  }

  /**
   * Retrieves records from the specified table based on the given conditions.
   *
   * @param {object} [conditions] - An optional object specifying the conditions (e.g., { id: 1, name: 'John' }).
   * @param {string[]} [columns] - An optional array of column names to select. Defaults to all columns ('*').
   * @returns {Promise<any[]>} - A promise that resolves to an array of records.
   */
  async function read(conditions = {}, columns = '') {
    try {
      log.debug(conditions, `dao.read for table ${table}:`);
      const result = await db.knex(table).select(columns).where(conditions);
      return result;
    } catch (err) {
      log.error(err, `Error reading records from ${table}:`);
      throw err;
    }
  }

  /**
   * Updates records in the specified table based on the given conditions.
   *
   * @param {object} conditions - An object specifying the conditions for the update (e.g., { id: 1 }).
   * @param {object} data - An object containing the data to update (e.g., { name: 'John Doe', email: 'john.doe@example.com' }).
   * @returns {Promise<number>} - A promise that resolves to the number of updated rows.
   */
  async function update(conditions, data) {
    try {
      log.debug(conditions, data, `dao.update in table ${table}`);
      const numAffected = await db.knex(table).where(conditions).update(data);
      return numAffected;
    } catch (err) {
      log.error(err, `Error updating records in ${table}:`);
      throw err;
    }
  }

  /**
   * Deletes records from the specified table based on the given conditions.
   *
   * @param {object} conditions - An object specifying the conditions for the deletion (e.g., { id: 1 }).
   * @returns {Promise<number>} - A promise that resolves to the number of deleted rows.
   */
  async function del(conditions) {
    try {
      log.debug(conditions, `dao.del from table ${table} with conditions:`);
      const numAffected = await db.knex(table).where(conditions).del();
      return numAffected;
    } catch (err) {
      log.error(err, `Error deleting records from ${table}:`);
      throw err;
    }
  }

  /**
   * Return row count of the specified table.
   * @returns {Promise<number>} - A promise that resolves to the number of records in the table.
   */
  async function count() {
    const result = await db.knex(table).count('* as record_count').first();
    log.debug(result, 'Count:');
    return result.record_count;
  }

  /**
   * Return row count of the specified table.
   * @returns {Promise<any>|undefined} - A promise that resolves to a Category or undefined.
   */
  async function findOne(qry) {
    log.debug(qry, `dao.findOne for table ${table}:`);
    const result = await db.knex(table).where(qry).first();
    return result;
  }

  return {
    create,
    read,
    update,
    del,
    count,
    findOne,
  };
}
