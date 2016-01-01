Template.encountersList.events({
    addUrlData: function(){
        console.log(this.data);
        return {
            campaignId: this.campaign._id
        }
    }
});

Template.encountersList.events({
    "click .encounter-row": function(){
        Router.go("encountersView", {campaignId: this.campaign, encounterId: this._id});
    }
});