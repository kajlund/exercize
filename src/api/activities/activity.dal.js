import { ActivityBuilder } from './activity.model.js';
import { InternalServerError, NotFoundError } from '../../errors.js';
import getDB from '../../db.js';
import getLogger from '../../logger.js';

export default function getActivityDAL() {
  const log = getLogger();
  const db = getDB();

  const selFields = [
    'a.id',
    'a.activityDate',
    'c.name as categoryName',
    'a.title',
    'a.comment',
    'a.duration',
    'a.distance',
    'a.pace',
    'a.elevation',
    'a.calories',
    'a.heartrate as heartRate',
    'a.cadence',
    'a.createdAt',
    'a.updatedAt',
  ];

  async function createActivity(data) {
    const activity = new ActivityBuilder()
      .setWhen(data.activityDate)
      .setCategory(data.categoryId)
      .setTitle(data.title)
      .setComment(data.comment)
      .setDuration(data.duration)
      .setDistance(data.distance)
      .setPace(data.pace)
      .setElevation(data.elevation)
      .setCalories(data.calories)
      .setHeartRate(data.heartRate)
      .setCadence(data.cadence)
      .build();
    log.debug(activity, 'creating activity instance:');

    await db.knex('activities').insert(activity).returning('id');
    const created = await findActivityById(activity.id);
    if (!created) throw new NotFoundError('Failed to find created activity');
    log.debug(created, 'Created activity:');
    return created;
  }

  async function deleteActivity(id) {
    const found = await findActivityById(id);
    if (!found) throw new NotFoundError(`Activity with id ${id} was not found`);

    const numAffected = await db.knex('activities').where({ id }).del();
    if (!numAffected) throw new InternalServerError(`Activity with id ${id} could not be deleted`);
    return found;
  }

  async function findActivityById(id) {
    const result = await db.knex
      .table('activities as a')
      .leftJoin('categories as c', 'a.categoryId', 'c.id')
      .where('a.id', id)
      .select(selFields)
      .first();
    console.dir(result);
    return result;
  }

  async function queryActivities(query = {}) {
    const result = await db.knex
      .table('activities as a')
      .leftJoin('categories as c', 'a.categoryId', 'c.id')
      .where(query)
      .select(selFields);

    return result;
  }

  async function updateActivity(id, data) {
    const activity = new ActivityBuilder()
      .setWhen(data.activityDate)
      .setCategory(data.categoryId)
      .setTitle(data.title)
      .setComment(data.comment)
      .setDuration(data.duration)
      .setDistance(data.distance)
      .setPace(data.pace)
      .setElevation(data.elevation)
      .setCalories(data.calories)
      .setHeartRate(data.heartRate)
      .setCadence(data.cadence)
      .build();
    delete activity.id; // Don't update ID
    log.debug(activity, 'using activity instance:');
    const numAffected = await db.knex('activities').where({ id }).update(activity);
    if (!numAffected) throw new InternalServerError(`Activity with id ${id} could not be updated`);
    const updated = await findActivityById(id);
    if (!updated) throw new NotFoundError(`Activity with id ${id} was not found`);
    return updated;
  }
  return { createActivity, deleteActivity, findActivityById, queryActivities, updateActivity };
}
