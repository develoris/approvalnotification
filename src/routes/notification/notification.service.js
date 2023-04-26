const { AXIOS_NOTIFICATION } = require('../../config/axios');
class NotificationService {
    keysForNotification = ['requester_email', 'from', 'to', 'count_total'];
    /**
     * @param {string} accessToken 
     */
    async getNotificationsCsfr(accessToken) {
        let headerNotification = null;
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'X-CSRF-Token': 'fetch'
        }
        try {
            const response = await AXIOS_NOTIFICATION.head('/v2/Notification.svc/Notifications', { headers })
            headerNotification = { ...response.headers };
        } catch (error) {
            headerNotification = { ...error.response.headers };
        }
        return {
            'x-csrf-token': headerNotification['x-csrf-token'],
            'set-cookie': headerNotification['set-cookie']
        }
    }
    /**
     * @param {string} accessToken 
     * @return {Promise<string[]>}
     */
    async getAllNotificationsType(accessToken) {
        const responseAllNotification = await AXIOS_NOTIFICATION.get("/v2/NotificationType.svc/NotificationTypes", {
            headers: await this.getCommonHeaders(accessToken)
        })
        return responseAllNotification.data.d.results;
    }
    /**
     * @param {string} accessToken 
     * @param {object} notification 
     * @returns {Promise}
     */
    async sendNotification(accessToken, notification) {
        const headers = await this.getCommonHeaders(accessToken)
        const postNotResp = await AXIOS_NOTIFICATION.post('/v2/Notification.svc/Notifications',
            notification,
            { headers })
    }
    /**
     * @param {string} accessToken 
     * @param {object} notification 
     * @returns {Promise}
     */
    async sendNotificatiuonPurchasesRequest(accessToken, notification) {
        const headers = await this.getCommonHeaders(accessToken)
        const postNotResp = await AXIOS_NOTIFICATION.post('/v2/Notification.svc/Notifications',
            notification,
            { headers })
        console.log('notification sended')
    }

    async createNotificationType(accessToken, notificationType) {
        const headers = await this.getCommonHeaders(accessToken)

        const notificationTypeResponse = await AXIOS_NOTIFICATION.post("/v2/NotificationType.svc/NotificationTypes", notificationType, {
            headers
        })
        console.log(`notification type ${notificationTypeResponse.data.d.NotificationTypeKey} created`);
    }
    buildNotificationForTest({ PropertiesKey, ...othersProp }) {
        const notification = {
            OriginId: 'leave-req-dest',
            NotificationTypeKey: 'LeaveRequest',
            NotificationTypeVersion: '0.3',
            NavigationTargetAction: 'display',
            NavigationTargetObject: 'LeaveRequest',
            Priority: 'High',
            ActorId: 'NAIRA',
            ActorType: '',
            ActorDisplayText: '',
            ActorImageURL: 'https://scn.sap.com/people/guest/avatar/NAIRA.png',
            Properties: [
                { Key: 'requester_email', Language: 'en', Value: PropertiesKey['requester_email'], Type: 'String', IsSensitive: false },
                { Key: 'from', Language: 'en', Value: PropertiesKey['from'], Type: 'String', IsSensitive: true },
                { Key: 'to', Language: 'en', Value: PropertiesKey['to'], Type: 'String', IsSensitive: true },
                { Key: 'count_total', Language: 'en', Value: PropertiesKey['from'], Type: 'Integer', IsSensitive: true }
            ],
            Recipients: othersProp['Recipients']
        }
        return notification;
    }
    buildNotificationForPurchasesRequest({ PropertiesKey, ...othersProp }) {
        const notification = {
            OriginId: 'purchase-req-dest',
            NotificationTypeKey: 'PurchaseRequest',
            NotificationTypeVersion: '0.1',
            NavigationTargetAction: `display&/detail/${PropertiesKey['number']}`,
            NavigationTargetObject: 'prapproval',
            Priority: 'High',
            ActorId: 'NAIRA',
            ActorType: '',
            ActorDisplayText: '',
            ActorImageURL: 'https://scn.sap.com/people/guest/avatar/NAIRA.png',
            Properties: [
                { Key: 'number', Language: 'en', Value: PropertiesKey['number'], Type: 'String', IsSensitive: false },
                { Key: 'number', Language: 'it', Value: PropertiesKey['number'], Type: 'String', IsSensitive: false },
                { Key: 'requester_email', Language: 'en', Value: PropertiesKey['requester_email'], Type: 'String', IsSensitive: false },
                { Key: 'count_total', Language: 'en', Value: PropertiesKey['count_total'], Type: 'Integer', IsSensitive: true },
                { Key: 'count_total', Language: 'IT', Value: PropertiesKey['count_total'], Type: 'Integer', IsSensitive: true }
            ],
            Recipients: othersProp['Recipients'],
            TargetParameters: [
                {
                    "Key": "notification",
                    "Value": "true"
                }
            ]
        }
        return notification;
    }
    async getCommonHeaders(accessToken) {
        const responseCsfr = await this.getNotificationsCsfr(accessToken)
        return {
            'Authorization': `Bearer ${accessToken}`,
            'X-CSRF-Token': responseCsfr['x-csrf-token'],
            'Cookie': responseCsfr['set-cookie'],
        };
    }
}

module.exports = NotificationService;