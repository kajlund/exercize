// import Proverb from "./proverb.model.js";
import getLogger from '../../logger.js';
import getDAO from '../../dao.js';
import { BadRequestError, InternalServerError, NotFoundError } from '../../errors.js';

export default function (opts = { log: getLogger(), dao: getDAO('categories') }) {
  const { log, dao } = opts;

  return {
    createCategory: async (data) => {
      log.debug(data, 'Creating new category:');
      const found = await dao.findOne({ name: data.name });
      if (found) throw new BadRequestError(`Category with name ${data.name} already exists`);
      const id = await dao.create(data);
      if (!id) throw new InternalServerError('Failed to create category');
      const created = await dao.read({ id });
      if (!created) throw new NotFoundError('Failed to find created category');
      log.debug(created, 'Created category:');
      return created;
    },
    deleteCategory: async (id) => {
      log.debug(`Deleting category ${id}`);
      const found = await dao.read({ id });
      if (!found) throw new NotFoundError(`Category with id ${id} was not found`);
      const result = await dao.del({ id });
      if (!result) throw new InternalServerError(`Category with id ${id} could not be deleted`);
      return found;
    },
    findCategoryById: async (id) => {
      log.debug(`Finding category ${id}`);
      const found = await dao.findOne({ id });
      if (!found) throw new NotFoundError(`Category with id ${id} was not found`);
      log.debug(found, 'Found category:');
      return found;
    },
    queryCategories: async (query) => {
      log.debug(query, 'Querying categories:');
      // const { name } = query;
      // const qry = {};
      // if (name) {
      //   qry.name = { $regex: title, $options: 'i' };
      // }
      const result = await dao.read({});
      // const cnt = await dao.count();
      // log.info(`Number of documents ${cnt}`);
      return result;
    },
    updateCategory: async (id, data) => {
      log.debug(data, `Updating category ${id}`);
      const found = await dao.findOne({ id });
      if (!found) throw new NotFoundError(`Category with id ${id} was not found`);
      const { name } = data;
      if (name) {
        const existing = await dao.findOne({ name });
        if (existing && existing.id !== id) throw new BadRequestError(`Category with name ${name} already exists`);
      }
      const result = await dao.update({ id }, data);
      if (!result) throw new InternalServerError(`Category with id ${id} could not be updated`);
      const updated = await dao.findOne({ id });
      if (!updated) throw new NotFoundError(`Category with id ${id} was not found`);
      log.debug(updated, 'Updated category:');
      return updated;
    },
  };
}
