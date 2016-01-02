Template.encountersAdd.helpers({
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
            players: this.campaign.players,
            playerCharacters: Characters.find({campaign: this.campaign._id}).fetch().map(function(pc){return pc._id;}),
            characters: [],
            monsterGenerators: []
        };

        var id = Encounters.insert(encounter);

        Router.go("encountersView", {campaignId: this.campaign._id, encounterId: id});
    }
});


