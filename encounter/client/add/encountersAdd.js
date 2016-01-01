Template.encountersAdd.events({
    "submit .new-encounter": function (event) {
        event.preventDefault();
        var encounter = {
            campaign: this.campaign._id,
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

        Router.go("encountersView", this.campaign._id, id);
    }
});
