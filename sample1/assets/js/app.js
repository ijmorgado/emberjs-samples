
App = Ember.Application.create();

App.Store = DS.Store.extend({
	revision: 12,
	adapter: 'DS.FixtureAdapter'
});

App.Router.map(function(){
	this.resource('posts',function(){
		this.resource('post',{ path : ':post_id' });
	});
	this.resource('about');
});

App.PostsRoute = Ember.Route.extend({
	model: function(){
		return App.Post.find();
	}
});

App.IndexRoute = Ember.Route.extend({
	redirect: function(){
		this.transitionTo('posts');
	}
});

App.PostController = Ember.ObjectController.extend({
	isEditing: false,
	edit: function(){
		this.set('isEditing',true)
	},
	doneEditing: function(){
		this.set('isEditing',false)
	}
});

App.Post = DS.Model.extend({
	title: DS.attr('string'),
	author: DS.attr('string'),
	intro: DS.attr('string'),
	extended: DS.attr('string'),
	publishedAt: DS.attr('date')
});

App.Post.FIXTURES = [{
	id: 1,
	title: 'How many appps are made?',
	author: 'Ivan Morgado',
	intro: 'I don\'t know ....this is [Facebook](http://www.facebook.com)',
	publishedAt: new Date('12-01-2012'),
	extended: 'Bla....Bla....Bla....Bla....Bla....'
},{	id: 2,
	title: 'How much money you need?',
	author: 'Natham M.',
	intro: 'I don\'t need money... :)',
	publishedAt: new Date('23-23-2222'),
	extended: 'More bla.... bla.... bla.... bla.... bla.... bla.... bla....this is [Google](http://www.google.com.mx)'
}]

Ember.Handlebars.registerBoundHelper('date',function(date){
	return moment(date).fromNow();
});

var showdown = new Showdown.converter();

Ember.Handlebars.registerBoundHelper('markdown',function(input){
	return new Ember.Handlebars.SafeString(showdown.makeHtml(input));
});