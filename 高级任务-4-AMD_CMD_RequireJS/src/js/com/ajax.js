	define(['jquery','com/waterFull'],function($,waterFull){
     
	function ajax(){
    this.init()
  }

  ajax.prototype = {

    init: function(){
      this.$btn = $('#load-more')
      this.$ct = $('#img-show .ct')
      this.bind()
      this.pageIndex = 0
    },

    bind: function(){

      var _this = this
      this.$btn.on('click', function(e){

        var __this = this
        e.preventDefault();

        this.xhr = new XMLHttpRequest()
        this.xhr.onreadystatechange = function(){

          if(__this.xhr.readyState === 4){
              if(__this.xhr.status === 200 || __this.xhr.status ===304){
                  console.log(__this.xhr.responseText)
                  this.results = JSON.parse(__this.xhr.responseText)
                  this.results.forEach(function(result){
                    console.log(result)
                    this.$node = $("<li></li>")
                    this.$img = new Image()
                    this.$img.src = result
                    this.$node.append(this.$img)

                    $('#img-show .ct').append(this.$node)
                  })

                  _this.pageIndex = _this.pageIndex + 5                             
              }

                 new waterFull()

               $("#img-show .ct").css({
                 height: "+=" + 400
               })
            } 

          }
      
        this.xhr.open('get','/loadMore?index='+_this.pageIndex+'&length=5',true)
        this.xhr.send()







       })     
    }
  }

  
//new ajax()

return ajax;
  })
 