Meteor.publish("campaigns", function(){
    if (this.userId) {
        return Campaigns.find({});
    } else {
        this.ready();
    }
});
