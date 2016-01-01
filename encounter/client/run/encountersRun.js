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
    }
});
