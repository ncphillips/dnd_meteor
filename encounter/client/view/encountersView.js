Template.encountersView.onCreated(function(){
    console.log(this);
});

Template.encountersView.helpers({
    dmEmail: function(){
        if (this.campaign){
            var dm = Meteor.users.findOne({_id: this.campaign.dungeonMaster});
            if(dm){
                return dm.emails[0].address;
            }
        }
    },
    playerEmails: function(){
        if (!this.encounter)
            return [];

        var players = Meteor.users.find({_id: {$in: this.encounter.players}});
        return players.map(function(player){
            if (player){
                return {email: player.emails[0].address, _id: player._id};
            } else{
                return {};
            }
        });
    },
    notStarted: function() { return this.status === "Not Started"; },
    inProgress: function() { return this.status === "In Progress"; },
    isDone: function() { return this.status === "Done"; },
    userIsDm: function(){
        if (!this.campaign) {
            return false;
        }
        return Meteor.userId() === this.campaign.dungeonMaster;
    },
    userIsCreatorOrDm: function(){
        if (!this.campaign) {
            return false;
        }
        return Meteor.userId() === this.campaign.dungeonMaster || Meteor.userId() === this.encounter.creator;
    },
    potentialPlayers: function(){
        if (!this.encounter || !this.campaign) {
            return false;
        }

        console.log(this.encounter.players, this.campaign.dungeonMaster, this.encounter.creator);
        var players = $.merge([], this.encounter.players, [this.campaign.dungeonMaster], [this.encounter.creator]);
        var users = Meteor.users.find({_id: {$nin: players}}).fetch();
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

Template.encountersView.events({
    "click .add-player": function(){
        var newPlayer = $("#new-player").find(":selected").val();
        Encounters.update(this.encounter._id, {$push: {players: newPlayer}});
    },
    "click .remove-player": function(){
        var encounterId = Router.current().params.encounterId;
        Encounters.update(encounterId, {$pull: {players: this._id}});
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

        Encounters.update(this._id, {$push: {monsterGenerators: monsterGenerator}});
    },
    "click #start-encounter": function(){
        var characters = [];
        this.encounter.monsterGenerators.forEach(function(generator){
            var monster;
            var monsterTemplate;
            for (var i=1; i <= generator.count; i++) {
                monsterTemplate = Monsters.findOne({name: generator.monsterName});
                monster = $.extend({}, monsterTemplate, {name: [monsterTemplate.name, i].join(" ")});
                delete monster._id;
                if (monster.hd) {
                    //monster.hp = rollHitDie(monster.hd);
                }
                monster.max_hp = monster.hp;
                monster.initiative = rollD20(monster.abilities.str);
                characters.push(monster);
            }
        });

        Encounters.update(this._id, {$set: {status: "In Progress", characters: characters}});

        Router.go('encountersRun', {id: this._id});
    },
    "click #view-running-encounter": function(){
        Router.go('encountersRun', {id: this._id});
    }
});

function rollD20(mod) {
    return Math.floor(Math.random() * 20) + 1 + mod;
}

function rollHitDie(hd) {
    return 1;
}