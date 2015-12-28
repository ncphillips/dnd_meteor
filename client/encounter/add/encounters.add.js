Template.encounters_add.events({
    "submit .new-encounter": function (event) {
        event.preventDefault();
        var encounter = {
            name: $("#name").val(),
            status: "Not Started",
            description: $("#description").val(),
            creator: Meteor.userId(),
            dungeonMaster: Meteor.userId(),
            players: [],
            characters: [],
            monsterGenerators: []
        };
        var id = Encounters.insert(encounter);
        var url = "/encounters/" + id;
        Router.go(url);
    }
});
