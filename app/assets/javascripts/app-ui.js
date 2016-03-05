/* globals window, localStorage, FormData, $, Blob, atob, unescape */




function dataURItoBlob( dataURI ) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1]);
  else
    byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], {type:mimeString});
}




function updateTweetBtn ( url ){
  var elm = $('#acop-2');
  var link = 'https://twitter.com/intent/tweet?';
  var params = $.param({
    text: "Happy Women's Day",
    hashtags: 'BecauseSheMatters',
    url: url,
  });
  elm.attr('href', link + params );
}




function ImgApi(){
  this.apiUrl = 'http://www.becauseindiafirstlife.com/img-api/v1';
  // this.apiUrl = 'https://localhost:5667';
}


ImgApi.prototype = {
  _requst : function( method, path, body ){
    body = body || {};

    var args = {
      url: this.apiUrl + path,
      method: method,
    };

    if( method == 'post' ){
      args.contentType = false;
      args.processData = false;
      args.data = new FormData(  );
      Object.keys( body ).forEach( function( v ){
        args.data.append( v, body[v] );
      });
    }

    return $.ajax( args );
  },


  saveImage: function( dataUrl ){
    var blob = dataURItoBlob( dataUrl );
    return this._requst( 'post', '/save', { imgData: blob } );
  },

  saveImageAndUpdateUrl: function(){
    var img = localStorage.avatar;
    $('body').addClass('is-uploading');
    return this.saveImage( img )
      .then( function( data ){
        console.log( data.imageUrl );
        localStorage.imageUrl = data.imageUrl;
        updateTweetBtn( data.imageUrl );
        $('body').removeClass('is-uploading');
        return data;
      });
  }

};


window.imgApi = new ImgApi();


$(function(){
  window.imgApi.saveImageAndUpdateUrl();
});



