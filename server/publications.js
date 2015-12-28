Meteor.publish("userData", function () {
    if (this.userId) {
        return Meteor.users.find({}, {_id: 1, "emails.address": 1});
    } else {
        this.ready();
    }
});

Meteor.publish("monsters", function(){
    if (this.userId) {
        return Monsters.find({});
    } else {
        this.ready();
    }
});

Meteor.publish("encounters", function(){
    if (this.userId) {
        return Encounters.find({});
    } else {
        this.ready();
    }
});