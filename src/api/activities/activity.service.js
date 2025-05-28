// import Proverb from "./proverb.model.js";
import getLogger from '../../logger.js';
import getDAO from '../../dao.js';
import getActivityDAL from './activity.dal.js';
import { BadRequestError, NotFoundError } from '../../errors.js';
import { mToKM, secToHHMMSS, secToMMSS } from '../../utils.js';

export default function (
  opts = { log: getLogger(), dalActivity: getActivityDAL(), daoCategory: getDAO('categories') },
) {
  const { log, dalActivity, daoCategory } = opts;

  const rowToEntity = (row) => {
    return {
      id: row.id,
      activityDate: row.activityDate,
      categoryId: row.categoryId,
      categoryName: row.categoryName,
      title: row.title,
      comment: row.comment,
      duration: secToHHMMSS(row.duration),
      distance: mToKM(row.distance),
      pace: secToMMSS(row.pace),
      elevation: row.elevation,
      calories: row.calories,
      heartRate: row.heartRate,
      cadence: row.cadence,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  };

  return {
    createActivity: async (data) => {
      log.debug(data, 'Creating new activity:');

      // Verify category
      const found = await daoCategory.findOne({ id: data.categoryId });
      if (!found) throw new BadRequestError(`Category with id ${data.categoryId} not found`);
      // Create activity
      const created = await dalActivity.createActivity(data);
      return rowToEntity(created);
    },
    deleteActivity: async (id) => {
      log.debug(`Deleting activity ${id}`);
      const deleted = await dalActivity.deleteActivity(id);
      return rowToEntity(deleted);
    },
    findActivityById: async (id) => {
      log.debug(`Finding activity ${id}`);
      const found = await dalActivity.findActivityById(id);
      if (!found) throw new NotFoundError(`Activity with id ${id} was not found`);
      log.debug(found, 'Found activity:');
      return rowToEntity(found);
    },
    queryActivities: async (query) => {
      log.debug(query, 'Querying activities:');
      // const { name } = query;
      // const qry = {};
      // if (name) {
      //   qry.name = { $regex: title, $options: 'i' };
      // }
      const result = await dalActivity.queryActivities();
      const activities = result.map((row) => rowToEntity(row));
      return activities;
    },
    updateActivity: async (id, data) => {
      log.debug(data, `Updating activity ${id}`);

      // Verify category
      const category = await daoCategory.findOne({ id: data.categoryId });
      if (!category) throw new BadRequestError(`Category with id ${data.categoryId} not found`);

      const updated = await dalActivity.updateActivity(id, data);
      if (!updated) throw new NotFoundError(`Activity with id ${id} was not found`);
      log.debug(updated, 'Updated activity:');
      return rowToEntity(updated);
    },
  };
}
