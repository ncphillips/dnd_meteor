Meteor.publish("campaigns", function(){
    var userId = this.userId;
    if (userId) {
        return Campaigns.find({
            $or: [
                { creator: userId },
                { dungeonMaster: userId },
                { players: userId }
            ]
        });
    } else {
        this.ready();
    }
});
