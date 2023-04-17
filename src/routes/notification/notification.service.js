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
     * @param {object} notification 
     * @returns {Promise}
     */
    async sendNotification(accessToken, notification) {
        try {
            const responseCsfr = await this.getNotificationsCsfr(accessToken)
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
                'X-CSRF-Token': responseCsfr['x-csrf-token'],
                'Cookie': responseCsfr['set-cookie'],
                'Accept': 'application/json'
            };
            const postNotResp = await AXIOS_NOTIFICATION.post('/v2/Notification.svc/Notifications',
                notification,
                { headers })
            console.log(postNotResp.data)
            // const notificationTypeResponse = await axios.get('/v2/NotificationType.svc/NotificationTypes', { headers })
        } catch (error) {
            console.log(error);
        }
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
            ActorType: '', 'ActorDisplayText': '',
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
}

module.exports = NotificationService;