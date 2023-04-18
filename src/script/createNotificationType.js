require('dotenv').config();
const fs = require('fs/promises');
const { join } = require('path');
const AuthService = require('../services/authService');
const NotificationService = require('../routes/notification/notification.service');
const notificationService = new NotificationService();
const auth = new AuthService();
const start = async () => {
    try {
        const notyFicationTypeConfigFolder = join(process.cwd(), 'src', 'config', 'notificationType');
        const allNotificationtype = await fs.readdir(join(process.cwd(), 'src', 'config', 'notificationType'));
        const accessToken = await auth.getToken();
        const allNotificationsType = await notificationService.getAllNotificationsType(await auth.getToken());
        const notificationsTypeKeys = allNotificationsType.map(nt => nt.NotificationTypeKey);
        for (const notificationType of allNotificationtype.filter(n => !notificationsTypeKeys.includes(n.replace('.json', '')))) {
            const file = await fs.readFile(join(notyFicationTypeConfigFolder, notificationType), 'utf-8');
            await notificationService.createNotificationType(accessToken, JSON.parse(file))
        }

    } catch (error) {
        console.log(error);
    }
}
start();