Router.route("/campaigns", {
    name:"campaignsList",
    data: function(){
        return {
            campaigns: Campaigns.find({}).fetch()
        };
    }
});

Router.route("/campaigns/add", {name: "campaignsAdd"});

Router.route("/campaigns/:id", {
    name: "campaignsView",
    data: function () {
        return {
            campaign: Campaigns.find(this.params.id).fetch()[0]
        };
    }
});

