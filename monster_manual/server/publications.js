Meteor.publish("monsters", function(){
    if (this.userId) {
        return Monsters.find({});
    } else {
        this.ready();
    }
});