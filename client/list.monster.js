numPerPage = 15;

Session.set("monster-query",{source: "A MM"});
Session.set("page", 0);

Template.list_monster.helpers({
    pageNum: function(){
        return Session.get("page") + 1;
    },
    monsters: function(){
        var options = {
            sort: {page: 1},
            limit: numPerPage,
            skip: Session.get("page") * numPerPage
        };
        return Monsters.find(Session.get("monster-query"), options).fetch();
    }
});

Template.list_monster.events({
    "submit": function(e){
        e.preventDefault();
        var query = Session.get("monster-query");
        filterType(query);
        filterCr(query);
        Session.set("monster-query", query);
    },
    "click #next-page": function(){
        var currentPage = Session.get("page");
        Session.set("page", currentPage + 1);
    },
    "click #previous-page": function(){
        var currentPage = Session.get("page");
        var nextPage = currentPage > 1 ? currentPage - 1 : 0;
        Session.set("page", nextPage);
    },
    "click .monster-row": function(){
        var url = "/" + this.name.replace(" ", "_");
        Router.go(url);
    }
});


function filterType(query) {
    var type = $("#filter-type option:selected").text();
    if (type !== "Any") {
        query.type = type;
    } else {
        query.type = {$exists: true};
    }
}

function filterCr(query){
    var type = $("#filter-cr option:selected").text();
    if (type !== "Any") {
        query.cr = type;
    } else {
        query.cr = {$exists: true};
    }
}