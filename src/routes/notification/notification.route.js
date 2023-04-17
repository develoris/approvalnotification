const notificationRoute = require('express').Router();
const { asyncHandlerWrap } = require('../../utils/utils');
const notificationController = require('./notification.controller');


notificationRoute.get('/', asyncHandlerWrap(notificationController.getNotificationType))
notificationRoute.post('/', asyncHandlerWrap(notificationController.createNotification))
module.exports = notificationRoute;