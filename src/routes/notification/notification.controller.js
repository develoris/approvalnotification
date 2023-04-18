const express = require("express");
const NotificationService = require('./notification.service');
const notificationService = new NotificationService();
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const sendPurchasesRequestNotification = async (req, res) => {
    const notification = notificationService.buildNotificationForPurchasesRequest(req.body);
    await notificationService.sendNotificatiuonPurchasesRequest(await req.oauth2.getToken(), notification)
    return res.status(200).send('get notification type');
}
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const sendNotification = async (req, res) => {
    try {
        const token = await req.oauth2.getToken()
        const notification = notificationService.buildNotificationForTest(req.body)
        await notificationService.sendNotification(token, notification);
        res.send('true');
    } catch (error) {
        console.log(error);
    }
}
module.exports = { sendNotification, sendPurchasesRequestNotification };