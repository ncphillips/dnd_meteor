Router.route("/campaigns/:campaignId/playerCharacters", {
    name: 'playerCharactersList',
    data: function(){
        return {
            campaigns: Campaigns.find({}),
            playerCharacters: PlayerCharacters.find({})
        }
    }
});

Router.route("/campaigns/:campaignId/playerCharacters/add", {
    name: 'playerCharactersAdd',
    data: function(){
        return {
            campaigns: Campaigns.find({})
        }
    }
});
