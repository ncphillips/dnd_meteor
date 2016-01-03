Template.playerCharactersAdd.helpers({
    potentialPlayers: function(){
        if (!this.campaign) {
            return [];
        }

        var users = Meteor.users.find({_id: {$in: this.campaign.players}}).fetch();
        return users.map(function(user){
            if (user){
                return {email: user.emails[0].address, _id: user._id};
            } else {
                return {email: '', _id: ''};
            }
        })
    },
    crumbs: function(){
        var campaignId = this.campaign._id;
        var text = this.campaign.name;
        return {breadcrumbs: [
            {text: "Campaigns", name: "campaignsList", data: {}},
            {text: text,  name: "campaignsView", data: {campaignId: campaignId}},
            {text: "Players", name: "playerCharactersList", data: {campaignId: campaignId}}
        ]};
    }
});

Template.playerCharactersAdd.events({
    "submit .add-player-character": function(e){
        e.preventDefault();

        var urlParams = Router.current().params;

        var playerCharacter = {
            name: $("#character-name").val(),
            player: $('#character-player').val(),
            classLevel: $("#character-class-level").val(),
            race: $("#character-race").val(),
            hp_max: $("#character-hp-max").val(),
            playerCharacter: true,
            senses: {
                passive: $("#character-passive-perception").val()
            },
            campaign: urlParams.campaignId,
            description: $("#character-description").val(),
            background: $("#character-background").val()
        };

        var pcId = Characters.insert(playerCharacter);
        urlParams.pcId = pcId;
        Router.go('playerCharactersView', urlParams);
    }
});
