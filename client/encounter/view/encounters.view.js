Template.encounters_view.helpers({
    dmEmail: function(){
        var dm = Meteor.users.findOne({_id: this.dungeonMaster});
        if (dm) {
            return dm.emails[0].address;
        }
    },
    playerEmails: function(){
        if (!this.players)
            return [];

        var players = Meteor.users.find({_id: {$in: this.players}});
        return players.map(function(player){
            if (player){
                return {email: player.emails[0].address, _id: player._id};
            } else{
                return {};
            }
        });
    },
    notStarted: function() { return this.status === "Not Started"; },
    inProgress; function() { return this.status === "In Progress"; },
    userIsDm: function(){
        var uid = Meteor.userId();
        return uid === this.dungeonMaster;
    },
    userIsCreatorOrDm: function(){
        var uid = Meteor.userId();
        return uid === this.dungeonMaster || uid === this.creator;
    },
    potentialPlayers: function(){
        var potentialPlayerIds = $.extend([], this.players, [this.dungeonMaster], [this.creator]);
        var users = Meteor.users.find({_id: {$nin: potentialPlayerIds}}).fetch();
        return users.map(function(user){
            if (user){
                return {email: user.emails[0].address, _id: user._id};
            } else {
                return {email: '', _id: ''};
            }
        })
    },
    monsterTemplates: function(){
        return Monsters.find({}, {sort: {name: 1}}).fetch();
    }
});

Template.encounters_view.events({
    "click .add-player": function(){
        var newPlayer = $("#new-player").find(":selected").val();
        Encounters.update(this._id, {$push: {players: newPlayer}});
    },
    "click .remove-player": function(){
        var encounter = Session.get("currentEncounter");
        console.log(encounter);
        Encounters.update(encounter._id, {$pull: {players: this._id}});
    },
    "click .add-monster": function(){
        var count = $("#num-monsters").val();
        var monsterName = $("#monster-name").find(":selected").text();
        var monster = Monsters.findOne({name: monsterName});

        var monsterGenerator = {
            count: count || 0,
            monsterId: monster._id,
            monsterName: monster.name
        };

        console.log(monsterGenerator);

        Encounters.update(this._id, {$push: {monsterGenerators: monsterGenerator}});
    },
    "click #start-encounter": function(){
        Encounters.update(this._id, {$set: {status: "In Progress"}});
    },
});
