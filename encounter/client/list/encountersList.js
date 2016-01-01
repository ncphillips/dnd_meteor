encounterQuery = {};

Template.encountersList.helpers({
    encounters: function(){
        return Encounters.find(encounterQuery).fetch();
    }
});

Template.encountersList.events({
    "click .encounter-row": function(){
        Router.go("encountersView", {id: this._id});
    }
});