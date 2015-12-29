Meteor.publish("encounters", function(){
    if (this.userId) {
        return Encounters.find({});
    } else {
        this.ready();
    }
});
