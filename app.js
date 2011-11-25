

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
      Post.each(function(p) {
        for (n in posts.results)
          if (posts.results[n].id == p.id) {
            Post.fetch();
            this.render();
          }
      });
    },
    render: function() {
      var el = this;
      $.get('tpl/posts/item.html', function(data) {
      $(".items").html('');
      posts = Post.all();
      for (p in posts)
        $(".items").prepend(Mustache.to_html(data,posts[p]));
      });
    },
    create: function() {
      item = Post.create({ author:'', title:this.input.val() });
      this.input.val('');
    }
  }); 

  return new Posts({el:$("#content")});



	
	
});











