const express = require("express");
const NotificationService = require('./notification.service');
const notificationService = new NotificationService();
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const getNotificationType = async (req, res) => {
    console.log(req.oauth2)
    return res.send('get notification type');
}
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const createNotification = async (req, res) => {
    const token = await req.oauth2.getToken()
    const notification= notificationService.buildNotificationForTest(req.body)
    await notificationService.sendNotification(token, notification);
    res.send('true');
}
module.exports = { getNotificationType, createNotification };