Router.route("/campaigns/:campaignId/playerCharacters", {
    name: 'playerCharactersList',
    data: function(){
        return {
            campaign: Campaigns.findOne(this.params.campaignId),
            playerCharacters: PlayerCharacters.find({campaign: this.params.campaignId}).fetch()
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
