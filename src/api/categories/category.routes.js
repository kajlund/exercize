import validate from '../../middleware/validator.js';
import getCategoryHandler from './category.handler.js';

const idSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: {
      type: 'string',
      minLength: 24,
      maxLength: 24,
    },
  },
};

const categorySchema = {
  type: 'object',
  required: ['name'],
  properties: {
    name: {
      type: 'string',
      minLength: 3,
      maxLength: 100,
      description: 'Category name',
      example: 'Running',
    },
  },
};

export function getCategoryRoutes(options = { hnd: getCategoryHandler() }) {
  const { hnd } = options;

  return {
    group: {
      prefix: '/api/v1/categories',
      middleware: [],
    },
    routes: [
      {
        method: 'get',
        path: '/',
        middleware: [],
        handler: hnd.queryCategories,
      },
      {
        method: 'get',
        path: '/:id',
        middleware: [validate({ params: idSchema })],
        handler: hnd.findCategoryById,
      },
      {
        method: 'post',
        path: '/',
        middleware: [validate({ body: categorySchema })],
        handler: hnd.createCategory,
      },
      {
        method: 'put',
        path: '/:id',
        middleware: [validate({ params: idSchema, body: categorySchema })],
        handler: hnd.updateCategory,
      },
      {
        method: 'delete',
        path: '/:id',
        middleware: [validate({ params: idSchema })],
        handler: hnd.deleteCategory,
      },
    ],
  };
}
