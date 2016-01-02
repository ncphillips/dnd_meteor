Template.encountersRun.helpers({
    isCurrentCharacter: function(index){
        var encounter = Encounters.findOne(Router.current().params.encounterId);
        return encounter.currentPlayerIndex === index;
    },
    isUnconscious: function(hp){
        return hp <= 0;
    },
    currentCharacter: function(){
        if (this.encounter){
            return this.encounter.characters[this.encounter.currentPlayerIndex];
        } else {
            return {};
        }
    },
    characters: function(){
        return Characters.find({_id: {$in: this.encounter.characters}}, {sort: {initiative: -1}}).fetch();
    },
    crumbs: function(){
        var campaignId = this.campaign._id;
        var campaignName = this.campaign.name;
        var encounterId = this.encounter._id;
        var encounterName = this.encounter.name;
        return {breadcrumbs: [
            {text: "Campaigns", name: "campaignsList", data: {}},
            {text: campaignName,  name: "campaignsView", data: {campaignId: campaignId}},
            {text: "Encounters", name: "encountersList", data: {campaignId: campaignId}},
            {text: encounterName,  name: "encountersView", data: {campaignId: campaignId, encounterId: encounterId}}
        ]};
    }
});

Template.encountersRun.events({
    "click #next-turn": function(){
        var index = this.encounter.currentPlayerIndex + 1;
        var round = this.encounter.round;
        if (index >= this.encounter.characters.length) {
            index = 0;
            round++;
        }
        Encounters.update(this.encounter._id, {$set: {currentPlayerIndex: index, round: round}})
    },
    "keypress .deal-damage": function(e){
        var ENTER_CODE = 13;

        if (e.keyCode === ENTER_CODE) {
            e.preventDefault();

            var damage = e.target.value;
            console.log("Dealt " + damage + " damage to " + this.name);
            var newHealth = this.hp - damage;
            if (newHealth >= this.max_hp) {
                newHealth = this.max_hp;
            } else if (newHealth < 0) {
                newHealth = 0;
            }
            Characters.update(this._id, {$set: {hp: newHealth}});
        }
    }
});
