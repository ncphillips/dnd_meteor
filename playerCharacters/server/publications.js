Meteor.publish("playerCharacters", function(){
    if (this.userId) {
        return PlayerCharacters.find({});
    } else {
        this.ready();
    }
});