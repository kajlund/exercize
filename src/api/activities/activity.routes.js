import validate from '../../middleware/validator.js';
import getActivityHandler from './activity.handler.js';

const idSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: {
      type: 'string',
      minLength: 24,
      maxLength: 36,
    },
  },
};

const activitySchema = {
  type: 'object',
  required: ['activityDate', 'categoryId', 'title'],
  properties: {
    activityDate: {
      type: 'string',
      format: 'date',
      description: 'Date of the activity',
      example: '2025-01-01',
    },
    categoryId: {
      type: 'string',
      description: 'Id of Category',
      example: '',
    },
    title: {
      type: 'string',
      minLength: 3,
      maxLength: 50,
      description: 'Title of the activity',
      example: 'Morning Walk',
    },
    comment: {
      type: 'string',
      description: 'A comment about the activity',
      example: 'A relaxing walk around the hood.',
    },
    duration: {
      type: 'string',
      pattern: '^([0-9]{2}):([0-9]{2}):([0-9]{2})$',
      description: 'Duration of the activity in seconds',
      example: '01:00:00',
    },
    distance: {
      type: 'number',
      minimum: 0,
      description: 'Distance covered during the activity in km',
      example: 5.55,
    },
    pace: {
      type: 'string',
      pattern: '^([0-9]{2}):([0-9]{2})$',
      description: 'Average pace during the activity in mm:ss per kilometer',
      example: ' 05:00',
    },
    elevation: {
      type: 'number',
      description: 'Elevation gain during the activity in meters',
      minimum: 0,
      example: 35,
    },
    calories: {
      type: 'number',
      minimum: 0,
      description: 'Calories burned during the activity',
      example: 500,
    },
    heartRate: {
      type: 'number',
      minimum: 0,
      description: 'Average heart rate during the activity in beats per minute (BPM)',
      example: 120,
    },
    cadence: {
      type: 'number',
      minimum: 0,
      description: 'Average cadence during the activity in steps per minute (SPM)',
      example: 80,
    },
  },
};

export function getActivityRoutes(options = { hnd: getActivityHandler() }) {
  const { hnd } = options;

  return {
    group: {
      prefix: '/api/v1/activities',
      middleware: [],
    },
    routes: [
      {
        method: 'get',
        path: '/',
        middleware: [],
        handler: hnd.queryActivities,
      },
      {
        method: 'get',
        path: '/:id',
        middleware: [validate({ params: idSchema })],
        handler: hnd.findActivityById,
      },
      {
        method: 'post',
        path: '/',
        middleware: [validate({ body: activitySchema })],
        handler: hnd.createActivity,
      },
      {
        method: 'put',
        path: '/:id',
        middleware: [validate({ params: idSchema, body: activitySchema })],
        handler: hnd.updateActivity,
      },
      {
        method: 'delete',
        path: '/:id',
        middleware: [validate({ params: idSchema })],
        handler: hnd.deleteActivity,
      },
    ],
  };
}
