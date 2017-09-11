define(['jquery'],function($){

	function goTop(id){
		this.id = id || "gotop";
		this.init()
	}

	goTop.prototype = {
		init: function(){
			var $el = $('#' + this.id)

			if($el.length ===0 ){
				this.$el = $('<div id = "' +this.id+ '" style = "position: fixed; border:1px solid red; text-align: center; cursor: pointer; width: 40px; right: 10px; bottom: 10px;">回到顶部</div>')
				$('body').append(this.$el)
			}else{
				this.$el = $el
			}

			this.$c = $(document)
			this.bind()
		},

		bind: function(){
			var _this = this;

			_this.$el.hide()

			this.$el.on('click',function(){
				_this.goToTop()
			})

			this.$c.on('scroll',function(){
				_this.scroll()
			})
		},

		goToTop: function(){
			this.$c.scrollTop(0)
		},

		scroll: function(){
			var scrollTop = this.$c.scrollTop()

			if(scrollTop > 500){
				this.$el.show()
			}else{
				this.$el.hide()
			}
		}

	}

	return goTop
	//new goTop();


})