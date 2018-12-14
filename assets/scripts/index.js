
xtag.create('x-clock', class extends XTagElement {
  connectedCallback() {
    this.start();
  }
  start() {
    this.update();
    this._interval = setInterval(() => this.update(), 1000);
  }
  stop() {
    this._interval = clearInterval(this._data.interval);
  }
  update() {
    this.textContent = new Date().toLocaleTimeString();
  }
  'tap::event'() {
    if (this._interval) this.stop();
    else this.start();
  }
});
xtag.create('x-books', class extends XTagElement {
  connectedCallback() {
    this.init();
  }
  init() {
    this.render();
  }
  '::template()'() {
    return `<table class="table book_table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Author</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>sss</td>
                </tr>
              </tbody>
            </table>`;
  }
  set 'maxVolume::attr' (value){
    console.log(value);
    return value;
  }
});

// $(function(){

//   /**
//    * 根据id删除书籍
//    * @param {*} id 
//    * @param {*} callback 
//    */
//   var deleteBookById = function(id, callback) {
//     $.post('/delete/' + id, function(data) {
//       if( typeof callback === 'function') {
//         callback( data );
//       }
//     });
//   };

//   $('.book_table').on('click', '.book_remove', function(event) {
//     var bookId = this.getAttribute('data-id');
//     deleteBookById(bookId, function(data) {
//       if(data.code === 200) {
//         location.href = '/index';
//       }
//     })
//   });


// });