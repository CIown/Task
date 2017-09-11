define(['jquery','com/carousel','com/gotop','com/waterFull','com/ajax'],function($,Carousel,goTop,waterFull,ajax){

	Carousel.init($(".carousel"))
	new goTop();
	new waterFull()
	new ajax()
})