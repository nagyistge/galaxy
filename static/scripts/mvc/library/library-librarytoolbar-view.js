// dependencies
define([
    "galaxy.masthead", 
    "utils/utils",
    "libs/toastr",
    "mvc/library/library-model"], 
function(mod_masthead, 
         mod_utils, 
         mod_toastr,
         mod_library_model) {

var ToolbarView = Backbone.View.extend({
  el: '#center',

  events: {        
    'click #create_new_library_btn' : 'delegate_modal',
    'click #include_deleted_chk'    : 'check_include_deleted'
  },

  initialize: function(){
    this.render();
  },

  render: function(){
    var toolbar_template = this.templateToolBar();
    this.$el.html(toolbar_template({admin_user: Galaxy.currUser.isAdmin(), anon_user: Galaxy.currUser.isAnonymous()}))
    if (Galaxy.currUser.isAdmin() === true){
      this.$el.find('#include_deleted_chk')[0].checked = Galaxy.libraries.preferences.get('with_deleted');
    }
  },

  delegate_modal: function(event){
    // probably should refactor to have this functionality in this view, not in the library view
    Galaxy.libraries.libraryListView.show_library_modal(event);
  },

  // include or exclude deleted libraries from the view
  check_include_deleted: function(event){
    if (event.target.checked){
        Galaxy.libraries.preferences.set({'with_deleted': true});
        Galaxy.libraries.libraryListView.render();
    } else{
        Galaxy.libraries.preferences.set({'with_deleted': false});
        Galaxy.libraries.libraryListView.render();
    }
  },

  templateToolBar: function(){
    tmpl_array = [];

    tmpl_array.push('<div id="libraries_container" style="width: 90%; margin: auto; margin-top:2em; overflow: auto !important; ">');
    // TOOLBAR
    tmpl_array.push('  <div id="toolbar_form" margin-top:0.5em; ">');
    tmpl_array.push('       <h3>Data Libraries Beta Test. This is work in progress. Please report problems & ideas via <a href="mailto:galaxy-bugs@bx.psu.edu?Subject=DataLibrariesBeta_Feedback" target="_blank">email</a> and <a href="https://trello.com/c/nwYQNFPK/56-data-library-ui-progressive-display-of-folders" target="_blank">Trello</a>.</h3>');
    tmpl_array.push('   <% if(admin_user === true) { %>');
    tmpl_array.push('       <div id="library_toolbar">');
    tmpl_array.push('           <span data-toggle="tooltip" data-placement="top" title="Include deleted libraries"><input id="include_deleted_chk" style="margin: 0;" type="checkbox"> <span class="fa fa-trash-o fa-lg"></span></input></span>');
    tmpl_array.push('           <span data-toggle="tooltip" data-placement="top" title="Create New Library"><button id="create_new_library_btn" class="primary-button btn-xs" type="button"><span class="fa fa-plus"></span> New Library</button><span>');
    tmpl_array.push('       </div>');
    tmpl_array.push('   <% } %>');
    tmpl_array.push('  </div>');
    tmpl_array.push('  <div id="libraries_element">');
    tmpl_array.push('  </div>');
    tmpl_array.push('</div>');

    return _.template(tmpl_array.join(''));
  }
})

// return
return {
    ToolbarView: ToolbarView
};

});