## Create notification type

For create a notification type navigate into src/notificationType and create a file naming witbh the same name of notification type, example `PurchasesRequest.json` and create the configuration. 
For example: 
```json
{
    "NotificationTypeKey": "LeaveRequest",
    "NotificationTypeVersion": "0.3",
    "Templates": [
        {
            "Language": "en",
            "TemplatePublic": "A new leave request needs ur attention!",
            "TemplateSensitive": "Leave Request by {{requester_email}} from {{from}} to {{to}}",
            "TemplateGrouped": "You have {{count_total}} leave request(s) for approval",
            "TemplateLanguage": "Mustache",
            "Subtitle": "Leave Request"
        }
    ],
    "Actions": [
        {
            "ActionId": "AcceptLRActionKey",
            "Language": "en",
            "ActionText": "Accept",
            "GroupActionText": "Accept All",
            "Nature": "POSITIVE"
        },
        {
            "ActionId": "RejectLRActionKey",
            "Language": "en",
            "ActionText": "Reject",
            "GroupActionText": "Reject All",
            "Nature": "NEGATIVE"
        }
    ]
}
```
and run:
```bash
npm run generate-notification-type
```

## Run Program
```bash
npm run start
```