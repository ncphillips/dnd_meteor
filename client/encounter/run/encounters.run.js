Template.encounters_run.helpers({
    isCurrentCharacter: function(index){
        var encounter = Session.get("currentEncounter");
        var a = encounter.currentPlayerIndex === index;
        return a;
    },
    isUnconscious: function(hp){
        return hp <= 0;
    },
    currentCharacter: function(){
        return this.characters[this.currentPlayerIndex];
    }
});

Template.encounters_run.events({
    "click #next-turn": function(){
        var index = this.currentPlayerIndex + 1;
        var round = this.round;
        if (index >= this.characters.length) {
            index = 0;
            round++;
        }
        Encounters.update(this._id, {$set: {currentPlayerIndex: index, round: round}})
    }
});
