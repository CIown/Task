define(function(){

 function getChannel(){
 	this.init()
 	this.bindNav()
 }

 getChannel.prototype.init = function(){
 			var _this = this
 			this.channelCt = document.querySelector('.nav .channel .channel-ct')
 			this.navBackBtn = document.querySelector('.nav .back .fa')
 			this.navForwardBtn = document.querySelector('.nav .forward .fa')
 			this.title = document.querySelector('.musicbox .content .title')
 			this.auther = document.querySelector('.musicbox .content .auther')
 			this.lrc = document.querySelector('.musicbox .content .lrc')
 			this.music = new Audio()
 			this.length = 0;

 			//获取channel
 			this.get('http://api.jirengu.com/fm/getChannels.php',[],function(ret){ //获取channel
 				console.log(ret)
 				console.log(ret.channels)
 				_this.renderChannel(ret.channels) //ret.channels是数组
 			})

 			//设置channel-ct长度

		 				//this.channelCt.children是类数组
		 	console.log('children:')
		 	console.log(this.channelCt.children)
		 	console.log('length')
			console.log(this.channelCt.children.length)
		 	var list = [].slice.call(this.channelCt.children)
		 	console.log('list:')
		 	console.log(list)

 			list.forEach(function(li){
 				console.log(876543)
 				this.length +=parseInt(getComputedStyle(li).width)
 			})
 			this.channelCt.style.width = length+'px'
 			console.log('length:'+this.channelCt.style.width)

 }

 getChannel.prototype.bindNav = function(){
 		var _this = this
	 	this.channelCt.onclick = function(e){
	 		if(e.target.tagName.toLowerCase() != 'li'){
	 			return ;
	 		}else{
	 			var channelId = e.target.getAttribute('data-channel-id')
	 			_this.get('http://api.jirengu.com/fm/getSong.php',{channel:channelId},function(ret){
	 				_this.renderSong(ret.song[0])
	 				_this.play(ret.song[0].url)
	 			})
	 		}
	 	}

	 	this.navBackBtn.onclick = function(){
	 		if(parseInt(getComputedStyle(this.channelCt).left === 0)){
	 			return ;
	 		}else{
	 			this.channelCt.style.left +=20
	 		}
	 	}

	 	this.navForwardBtn.onclick = function(){
	 		if(parseInt(getComputedStyle(this.channelCt).left === -(this.length-420) ) ){
	 			return ;
	 		}else{
	 			this.channelCt.style.left = '-'+20+'px'
	 		}
	 	}

 }

 getChannel.prototype.get = function(url,data,callback,dataType){
 		url += '?' + Object.keys(data).map(function(key){
 			return key +'=' + data[key]
 		}).join('&')
 		var xhr = new XMLHttpRequest()
 		xhr.responseType =  dataType||'json'
 		xhr.onload = function(){
 			callback(xhr.response)
 		}
 		xhr.open('GET',url,true)
 		xhr.send()
 }

 getChannel.prototype.renderChannel = function(channels){
 	console.log(channels)

 		var html = channels.map(function(channel){
 			return '<li data-channel-id="'+channel.channel_id+'">'+ channel.name +'</li>'
 		}).join('')

 		 console.log(this.channelCt)
 		 this.channelCt.innerHTML = html
 }

 getChannel.prototype.renderSong = function(song){
 		console.log('1342456')
 		console.log(song.title)
 		this.title.innerText = song.title
 		this.auther.innerText = song.artist
 		this.lrc = song.lrc
 }

 getChannel.prototype.play = function(url){
 		this.music.src = url
 		this.music.play()
 }



 return getChannel
})