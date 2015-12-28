encounterQuery = {};

Template.encounters_list.helpers({
    encounters: function(){
        return Encounters.find(encounterQuery).fetch();
    }
});

Template.encounters_list.events({
    "click .add-encounter": function(){
        Router.go("encounters.add");
    },
    "click .encounter-row": function(){
        var url = "/encounters/" + this._id;
        Router.go(url)
    }
});