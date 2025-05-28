import status from '../../status.js';
import getActivityService from './activity.service.js';

export default function (opt = { svc: getActivityService() }) {
  const { svc } = opt;

  return {
    createActivity: async (req, res, next) => {
      const { body } = req;
      try {
        const activity = await svc.createActivity(body);
        res.status(status.codes.OK).json({
          success: true,
          status: status.codes.OK,
          message: 'Activity created',
          data: activity,
        });
      } catch (err) {
        next(err);
      }
    },

    deleteActivity: async (req, res, next) => {
      const { id } = req.params;
      try {
        const activity = await svc.deleteActivity(id);
        return res.status(status.codes.OK).json({
          success: true,
          status: status.codes.OK,
          message: `Deleted activity ${id}`,
          data: activity,
        });
      } catch (err) {
        next(err);
      }
    },

    findActivityById: async (req, res, next) => {
      const { id } = req.params;
      try {
        const activity = await svc.findActivityById(id);
        return res.status(status.codes.OK).json({
          success: true,
          status: status.codes.OK,
          message: `Found activity ${id}`,
          data: activity,
        });
      } catch (err) {
        next(err);
      }
    },
    queryActivities: async (req, res, next) => {
      try {
        const activities = await svc.queryActivities(req.query);
        return res.status(status.codes.OK).json({
          success: true,
          status: status.codes.OK,
          message: `Found ${activities.length} activities`,
          data: activities,
        });
      } catch (err) {
        next(err);
      }
    },
    updateActivity: async (req, res, next) => {
      const { params, body } = req;
      try {
        const activity = await svc.updateActivity(params.id, body);
        return res.status(status.codes.OK).json({
          success: true,
          status: status.codes.OK,
          message: `Updated activity ${params.id}`,
          data: activity,
        });
      } catch (err) {
        next(err);
      }
    },
  };
}
