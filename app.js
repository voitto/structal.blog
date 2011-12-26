

// models go here




// sets up Spine.Ajax to automatically sync the Post Model to the server-side database
var Post = Spine.Model.sub();
Post.configure( 'Post', 'author', 'title' );
Post.extend( Spine.Model.Ajax );



jQuery(function($){
	
	// controllers go here
	
	
	




  // this Controller for the list of posts is tied to a Model and the #content <div> of the UI

  var Posts = Spine.Controller.sub({
    events: {
      'click .create': 'create',
			'keydown #title': 'submitTitle'
    },
    elements: {
      ".items": "items",
      "input[type=text]": "input"
    },
    init: function() {
      Post.bind( 'refresh change', this.proxy( this.render ));
      var el = this;
      $.get('tpl/posts/list.html', function(data) {
        el.html(Mustache.to_html(data,{}));
      });
      Post.fetch();
      setInterval( function(){ el.poll( 'posts', 'serverChanges' ) }, 4*1000 );
    },
    serverChanges: function(data) {
      var posts = data;
      for (n in posts.results) {
        var found = false;
        Post.each(function(p) {
          if (posts.results[n].id == p.id)
            found = true;
        });
        if (found == false) {
          Post.fetch();
          this.render();
        }
      }
    },
    render: function() {
      var el = this;
      $.get('tpl/posts/item.html', function(data) {
      el.items.html('');
      posts = Post.all();
      for (p in posts)
        el.items.prepend(Mustache.to_html(data,posts[p]));
      });
    },
    create: function() {
      item = Post.create({ author:'', title:this.input.val() });
      this.input.val('');
    },
		submitTitle: function(e) {
			if (e.keyCode == 13) {
				document.getElementById('submit-button').click();
			}
		}
  }); 

  return new Posts({el:$("#content")});



	
	
});











