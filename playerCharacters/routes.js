Router.route("/campaigns/:campaignId/playerCharacters", {
    name: 'playerCharactersList',
    data: function(){
        return {
            campaign: Campaigns.findOne(this.params.campaignId),
            playerCharacters: Characters.find({campaign: this.params.campaignId, playerCharacter: true}).fetch()
        }
    }
});

Router.route("/campaigns/:campaignId/playerCharacters/add", {
    name: 'playerCharactersAdd',
    data: function(){
        return {
            campaign: Campaigns.findOne(this.params.campaignId)
        }
    }
});

Router.route("/campaigns/:campaignId/playerCharacters/:pcId", {
    name: 'playerCharactersView',
    data: function(){
        return {
            campaign: Campaigns.findOne(this.params.campaignId),
            playerCharacter: Characters.findOne(this.params.pcId)
        }
    }
});
