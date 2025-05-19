import status from '../../status.js';
import getCategoryService from './category.service.js';

export default function (opt = { svc: getCategoryService() }) {
  const { svc } = opt;

  return {
    createCategory: async (req, res, next) => {
      const { body } = req;
      try {
        const category = await svc.createCategory(body);
        res.status(status.codes.OK).json({
          success: true,
          status: status.codes.OK,
          message: 'Category created',
          data: category,
        });
      } catch (err) {
        next(err);
      }
    },
    deleteCategory: async (req, res, next) => {
      const { id } = req.params;
      try {
        const category = await svc.deleteCategory(id);
        return res.status(status.codes.OK).json({
          success: true,
          status: status.codes.OK,
          message: `Deleted category ${id}`,
          data: category,
        });
      } catch (err) {
        next(err);
      }
    },

    findCategoryById: async (req, res, next) => {
      const { id } = req.params;
      try {
        const category = await svc.findCategoryById(id);
        return res.status(status.codes.OK).json({
          success: true,
          status: status.codes.OK,
          message: `Found category ${id}`,
          data: category,
        });
      } catch (err) {
        next(err);
      }
    },
    queryCategories: async (req, res, next) => {
      try {
        const categories = await svc.queryCategories(req.query);
        return res.status(status.codes.OK).json({
          success: true,
          status: status.codes.OK,
          message: `Found ${categories.length} categories`,
          data: categories,
        });
      } catch (err) {
        next(err);
      }
    },
    updateCategory: async (req, res, next) => {
      const { params, body } = req;
      try {
        const category = await svc.updateCategory(params.id, body);
        return res.status(status.codes.OK).json({
          success: true,
          status: status.codes.OK,
          message: `Updated category ${params.id}`,
          data: category,
        });
      } catch (err) {
        next(err);
      }
    },
  };
}
