
	define(['jquery'],function($){

	function waterFull(){
		var _this = this
		this.init()
		$(window).resize(function(){
			_this.init()
		})
	}

	waterFull.prototype = {

		init: function(){

			this.item = $("#img-show li")
			this.arr = []
			this.length = parseInt($('#img-show ul').width()/$("#img-show li").width())

			for(var i = 0; i < this.length; i++){
				this.arr[i] = 0;
			}

			this.bind()
		},

		bind: function(){
			var _this = this
			this.item.each(function(){
				var __this = this
				 this.minValue = Math.min.apply(null,_this.arr)
				 this.minIndex = _this.arr.indexOf(this.minValue)
				$(this).css({
					top: _this.arr[__this.minIndex],
					left: $(this).outerWidth(true) * __this.minIndex
				})

				 _this.arr[this.minIndex] += $(this).outerHeight(true)

	})
		}

	}

	return waterFull
	//new waterFull()

	})
	