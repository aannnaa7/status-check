# The purpose of this project

This is a small project to learn and play around with web push notifications and do stuff only in plain JavaScript.

The app connects to the internal timecard device and reports on the current status of each employee. The user of the app can subscribe to be notified when one or more employee changes his/her status (comes in or goes out of the office) via Web Push Notifications.

# Running the project locally

To run the project locally Docker and node.js need to be installed.

There should be a file in the user directory that holds environment variables with the details on how to connect to the timecard API something like below:

```
# ~/status-check.env
TIMECARD_HOST=127.0.0.1
TIMECARD_PATH=/API/Timecard.ashx
TIMECARD_USER=user
TIMECARD_PASS=-pass
```

Run these commands in the project directory:
- `npm install`
- `docker-compose up`
- open browser on `http://localhost:8080`