<?php


$config = array(
  '',       // host name ('localhost' | '' | IP | name)
  'brian',  // db user name
  '',       // db user password
  'docs',   // db name
  5432,     // port number (3306/mysql | 5432/pgsql | 443/ssl)
  'pgsql'   // db type (mysql | pgsql | couchdb | mongodb | sqlite | remote)
);



require 'lib/Structal.php';
require 'lib/Mullet.php';


// Add your models and controllers here



// creating this Structal Model will create a "posts" table in your database
class Post extends Model {}
Post::configure( 'Post', 'author', 'title' );



// a Structal Controller that offers get/put/post/delete routes that Spine.js can hook into
// it binds the Post model 'change' event to a method that creates a "changes feed" for the client
class Posts extends Controller {
  function init() {
    Post::bind( 'change', 'addChange' );
  }
}



return new Posts();






