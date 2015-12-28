Router.configure({
    layoutTemplate: "base"
});

Router.route('/', function(){
    this.render('list_monster');
});

Router.route('/:name', function(){
    var name = this.params.name;
    this.render('monster', {
        data: function () {
            var query = {name: name.replace("_", " ")};
            var monster = Monsters.findOne(query);
            console.log(monster);
            return monster;

        }
    });

});

