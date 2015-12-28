Router.configure({
    layoutTemplate: "base"
});

Router.route('/', function(){
   this.render('homepage');
}, {name: "homepage"});

Router.route('/monsters', function(){
    if (!Meteor.userId())
        return this.redirect('/');
    this.render('list_monster');
}, {name: "monsters.list"});

Router.route('/monsters/:name', function(){
    if (!Meteor.userId())
        return this.redirect('/');

    var name = this.params.name;
    this.render('monster', {
        data: function () {
            var query = {name: name.replace("_", " ")};
            var monster = Monsters.findOne(query);
            console.log(monster);
            return monster;

        }
    });
}, {name: "monsters.view"});

