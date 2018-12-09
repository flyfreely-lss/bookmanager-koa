$(function(){

  /**
   * 根据id删除书籍
   * @param {*} id 
   * @param {*} callback 
   */
  var deleteBookById = function(id, callback) {
    $.post('/delete/' + id, function(data) {
      if( typeof callback === 'function') {
        callback( data );
      }
    });
  };

  $('.book_table').on('click', '.book_remove', function(event) {
    var bookId = this.getAttribute('data-id');
    deleteBookById(bookId, function(data) {
      if(data.code === 200) {
        location.href = '/index';
      }
    })
  });


});