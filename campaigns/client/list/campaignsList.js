Template.campaignsList.events({
    "click .campaign-row": function(){
        console.log("asdf");
        Router.go("campaignsView", {id: this._id});
    }
});
