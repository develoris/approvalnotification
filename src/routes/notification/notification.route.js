const notificationRoute = require('express').Router();
const { asyncHandlerWrap } = require('../../utils/utils');
const notificationController = require('./notification.controller');


notificationRoute.get('/', asyncHandlerWrap(notificationController.getNotificationType))
notificationRoute.post('/', asyncHandlerWrap(notificationController.sendNotification))
notificationRoute.post('/purchasesrequest', asyncHandlerWrap(notificationController.sendPurchasesRequestNotification))
module.exports = notificationRoute;