Router.route("/campaigns", {
    name:"campaignsList",
    data: function(){
        return {
            campaigns: Campaigns.find({}).fetch()
        };
    }
});

Router.route("/campaigns/add", {name: "campaignsAdd"});

Router.route("/campaigns/:campaignId", {
    name: "campaignsView",
    data: function () {
        return {
            campaign: Campaigns.find(this.params.campaignId).fetch()[0]
        };
    }
});

