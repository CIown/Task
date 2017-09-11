

define(['jquery'],function($){

	var carousel1 = (function($ct){
			function Carousel($ct){
		this.ct = $ct
		this.init()
		this.bind()
	}

	Carousel.prototype.init = function(){

	var width = this.ct.find(".img-ct").width(),
			height = this.ct.find(".img-ct").height();
	this.ct.find(".img-ct>li img").css({
	 	"width":width,
	 	"height":height
	 })

	 this.$imgs = this.ct.find('.img-ct>li')
	 this.$imgCt = this.ct.find('.img-ct')
	 this.$preBtn = this.ct.find(".pre")
	 this.$nextBtn = this.ct.find(".next")
	 this.$bulletBtn = this.ct.find(".bullet ul>li")

	 this.imgCount = this.$imgs.length
	 this.imgWidth = this.$imgs.width()
	 this.pageIndex = 0
	 this.isAnimate = false



	 console.log(this.ct.find(".img-ct").width())
	 console.log(this.ct.find(".img-ct>li").width())
	 console.log(this.ct.find(".img-ct>li img").width())
	 console.log(this.imgWidth)

	 this.$imgCt.append(this.$imgs.eq(0).clone())
	 this.$imgCt.prepend(this.$imgs.eq(this.imgCount-1).clone())
	 this.$imgCt.width((this.imgCount+2)*this.imgWidth)
	 this.$imgCt.css("left",-this.imgWidth)
	}

	Carousel.prototype.bind = function(){
		var _this = this
		this.$nextBtn.on('click',function(){
	 		_this.playNext()
	 })

	 this.$preBtn.on('click',function(){
	 		_this.playPre()
	 })
	}

	Carousel.prototype.playNext = function(){
		var _this = this
	 	if(this.isAnimate) return ;
	 	this.isAnimate = true;
	 	this.$imgCt.animate({
	 			left:'-='+_this.imgWidth},function(){
	 		_this.pageIndex++
	 		if(_this.pageIndex === _this.imgCount){
	 			_this.$imgCt.css('left',-_this.imgWidth)
	 			_this.pageIndex = 0;
	 		}
	 		_this.isAnimate = false;
	 		_this.bullet()
	 	})
	 
	}

	Carousel.prototype.playPre = function(){
		var _this = this
		if(this.isAnimate) return ;
	 	this.isAnimate = true;
	 	this.$imgCt.animate({left:'+='+this.imgWidth},function(){
	 		_this.pageIndex--

	 		if(_this.pageIndex === -1){
	 			_this.$imgCt.css('left',-_this.imgCount*_this.imgWidth)
	 			_this.pageIndex = 3;
	 		}
	 		_this.isAnimate = false;
	 		_this.bullet()
	 	})
	}

	Carousel.prototype.bullet = function(){
		this.$bulletBtn.removeClass("active")
	 	this.$bulletBtn.eq(this.pageIndex).addClass("active")
	}


		return {
			init: function($ct){
				$ct.each(function(index,node){
					new Carousel($(node))
				})

			}
		}
	})()

	return carousel1;
//	carousel1.init($(".carousel"))


})
	


