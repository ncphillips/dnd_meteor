Template.encountersAdd.events({
    "submit .new-encounter": function (event) {
        event.preventDefault();
        var encounter = {
            name: $("#name").val(),
            status: "Not Started",
            round: 1,
            currentPlayerIndex: 0,
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
