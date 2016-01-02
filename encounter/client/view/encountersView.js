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
    notStarted: function() {
        return this.encounter && this.encounter.status === "Not Started";
    },
    inProgress: function() {
        return this.encounter && this.encounter.status === "In Progress";
    },
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
    monsterTemplates: function(){
        return Monsters.find({}, {sort: {name: 1}}).fetch();
    },
    crumbs: function(){
        var campaignId = this.campaign._id;
        var campaignName = this.campaign.name;
        return {breadcrumbs: [
            {text: "Campaigns", name: "campaignsList", data: {}},
            {text: campaignName,  name: "campaignsView", data: {campaignId: campaignId}},
            {text: "Encounters", name: "encountersList", data: {campaignId: campaignId}}
        ]};
    }
});

Template.encountersView.events({
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

        Encounters.update(this.encounter._id, {$push: {monsterGenerators: monsterGenerator}});
    },
    "click #start-encounter": function(){
        // Generate Monsters
        var characters = [];
        this.encounter.monsterGenerators.forEach(function(generator){
            characters = $.merge(characters, generateMonsters(generator));
        });

        // Add Players
        characters = $.merge(characters, loadPlayerCharacters(this.campaign));

        // Update Status
        Encounters.update(this.encounter._id, {$set: {status: "In Progress", characters: characters}});

        Router.go('encountersRun', Router.current().params);
    },
    "click #view-running-encounter": function(){
        Router.go('encountersRun', Router.current().params);
    }
});

function rollD20(mod) {
    return Math.floor(Math.random() * 20) + 1 + mod;
}

function rollHitDie(hd) {
    return 1;
}

function generateMonsters(generator){
    var monsters = [];
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
        monsters.push(monster);
    }
    return monsters;
}

function loadPlayerCharacters(campaign) {
    return PlayerCharacters.find({campaign: campaign._id}).fetch();
}