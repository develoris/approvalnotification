//const xsenv = require('@sap/xsenv');
const axios = require('axios');

const destination =   {
    "clientid": "sb-a1c812b8-4dc6-4b4f-b5d3-44b5004d5124!b104923|xfsrt-service-broker!b3091",
    "clientsecret": "bindingId$_lizjrpUgmzFYpmh125PE86Vifj76NqfukeFdfJrO0w=",
    "baseUrl": "https://21b00683trial.authentication.us10.hana.ondemand.com",
    "notificationUrl": "https://notifications.cfapps.us10.hana.ondemand.com"
}

console.log("ciao");
login();

async function login() {
    //xsenv.loadEnv('default-env.json');
    //const xsuaa = xsenv.serviceCredentials({ label: "xsuaa" });
    //const destination2 = xsenv.serviceCredentials({ label: "destination" });

    //console.log(xsuaa);
    const xsuaaResponse = await axios.get("/oauth/token?grant_type=client_credentials", {
        baseURL: destination.baseUrl,
        auth: { username: destination.clientid, password: destination.clientsecret }
    });
    const accessToken = xsuaaResponse.data.access_token;
    console.log(accessToken);
    const notificationServiceResponse = axios.get("/v2/Notification.svc/Notifications", {
        baseURL: destination.notificationUrl,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-CSRF-Token': 'fetch'
        }
        
    }).then(notificationServiceResponse => {
        const csrfToken = notificationServiceResponse.headers["x-csrf-token"];
        const cookies = notificationServiceResponse.headers['set-cookie'];

    }).catch(async err => {
        var csrfToken = err.response.headers["x-csrf-token"];
        const cookies = err.response.headers['set-cookie'];
        const notificationType = {
            NotificationTypeKey: "LeaveRequest",
            NotificationTypeVersion: "0.3",
            Templates: [
                {
                    Language: "en",
                    TemplatePublic: "A new leave request needs ur attention!",
                    TemplateSensitive: "Leave Request by {{requester_email}} from {{from}} to {{to}}",
                    TemplateGrouped: "You have {{count_total}} leave request(s) for approval",
                    TemplateLanguage: "Mustache",
                    Subtitle: "Leave Request"
                }
            ],
            Actions: [
                {
                    ActionId: "AcceptLRActionKey",
                    Language: "en",
                    ActionText: "Accept",
                    GroupActionText: "Accept All",
                    Nature: "POSITIVE",
                },
                {
                    ActionId: "RejectLRActionKey",
                    Language: "en",
                    ActionText: "Reject",
                    GroupActionText: "Reject All",
                    Nature: "NEGATIVE",
                }
            ]
        };

        notificationTypeResponse = axios.get("/v2/NotificationType.svc/NotificationTypes",  {
            baseURL: destination.notificationUrl,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'X-CSRF-Token': csrfToken,
                'Cookie': cookies,
                'Accept': 'application/json'
            }
        }).then(notificationTypeResponse => {
            console.log(notificationTypeResponse.data.d);
        }).catch(err => {
            console.log(err);
        });
    });

}