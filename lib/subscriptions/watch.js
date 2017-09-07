const client = require('../redis');
const employees = require('../employees');
const webpush = require('web-push');

const PUSH_PRIVATE= 'uETcjAHGtLfkRbhiJDH8anTV6axMa-ZGRj-ABXyJIdA';
const PUSH_PUBLIC= 'BFT9-cYod6NToKQvJJOw92nNOlrwzjnkynXUM700N4tWlRLuentPL1YQFKRDF3M604ekg-Yz88VWAl9IRsi-DGE';

let endPoints = {};

client().hgetall("subscribers", (error, subscribers) => {
  if(subscribers){
  	for(let [key,value] of Object.entries(subscribers)){
  		for(id of JSON.parse(value)){
  			if(!endPoints[id]) endPoints[id] = [];
  			endPoints[id].push(key);
  		}
  	}
  }
});

module.exports = () => {
	let oldList = [];
    setInterval(async () => {
        try {
            let newList = await employees.fetch();
            if(oldList.length){
            	ids = compareStatuses(oldList, newList);
            	console.log(ids);
            	for(let id of ids){
            		sendPushNotification(id);
            	}
            }
            client().set('employees', JSON.stringify(newList));
            oldList = newList;
            console.log('Refreshed the employees list');
        } catch(e) {
            console.log('Unable to refresh the employees list');
        }
    }, 10000);
};

function compareStatuses(oldEmployees, newEmployees){
  let oldStatuses = {};
  let statusChangedEmployees = [];

  for(employee of oldEmployees){
    oldStatuses[ employee.id ] = employee.status;
  }

  for(employee of newEmployees){
    if(oldStatuses[ employee.id ] != employee.status){
      statusChangedEmployees.push(employee);
    }
  }

  return statusChangedEmployees;
}

function sendPushNotification(employee){

	webpush.setVapidDetails(
	  'mailto:example@yourdomain.org',
	   process.env.PUSH_PUBLIC,
	   process.env.PUSH_PRIVATE
	);

	// This is the same output of calling JSON.stringify on a PushSubscription (client.js)
	for(endPoint of endPoints[employee.id]){
		const pushSubscription = JSON.parse(endPoint);
		webpush.sendNotification(pushSubscription, employee.fullName+' has checked '+employee.status);
	}
}
