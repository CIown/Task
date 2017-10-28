define(function(){

 function getChannel(){
 	this.init()
 	this.bindNav()
 	this.bindControl()
 }

 getChannel.prototype.init = function(){
 		var _this = this
 		this.channelCt = document.querySelector('.nav .channel .channel-ct')
 		this.navBackBtn = document.querySelector('.nav .back .fa')
 		this.navForwardBtn = document.querySelector('.nav .forward .fa')
 		this.controlBackBtn = document.querySelector('.control .back .fa')
 		this.controlPlayBtn = document.querySelector('.control .play .fa')
 		this.controlForwardBtn = document.querySelector('.control .forward .fa')
 		this.progressBar = document.querySelector('.progress .bar')
 		this.progressNow = document.querySelector('.progress .bar .progress-now')
 		this.timeNode = document.querySelector('.progress .time')
 		this.volumeBtn = document.querySelector('.volume .fa')
 		this.volumeProgressBar = document.querySelector('.volume .volume-progress .bar')
 		this.volumeProgressNow = document.querySelector('.volume .volume-progress .volume-now')
 		this.title = document.querySelector('.musicbox .content .title')
 		this.auther = document.querySelector('.musicbox .content .auther')
 		this.lrc = document.querySelector('.musicbox .content .lrc')
 		this.channelId
 		this.musicSrc
 		this.music = new Audio()
 		//this.songLrc //未经处理的歌词 在rendersong里面被赋值
 		this.length = 0 //channelCt的宽度
 		this.moveLength = 0//channelCt每次移动的宽度
 		this.index //点击li 所在当前列表的序列
 		this.timer // setInterval
 		this.local = false //防止重复点击

 		//获取channelCt列表
 		this.get('https://jirenguapi.applinzi.com/fm/getChannels.php',{},function(ret){ //获取channel
 			console.log(ret)
 			console.log(ret.channels)
 			_this.renderChannel(ret.channels) //ret.channels是数组
 		})
 		//music相关设置 进度条设置 当前时间设置
 		this.musicSet()
 		//this.renderLrc(this.songLrc)//歌词同步
 		//console.log(this.songLrc)
 }

 getChannel.prototype.bindNav = function(){
 		var _this = this
 		this.temporaryIndex = null
 		//获取channelCt列表并且获取被点击li在当前列表的序列
	 	this.channelCt.addEventListener('click',function(e){
	 		if(e.target.tagName.toLowerCase() != 'li'){
	 			return ;
	 		}else{
	 			_this.channelId = e.target.getAttribute('data-channel-id')
	 			_this.get('https://jirenguapi.applinzi.com/fm/getSong.php',{channel:_this.channelId},function(ret){
	 				_this.renderSong(ret.song[0])
	 				_this.musicSrc = ret.song[0].url
	 				_this.play(_this.musicSrc)
	 			})
	 			//获取被点击li在当前列表的序列
	 			console.log(_this.ulList)
	 			for(li in _this.ulList){
	 				if(e.target === _this.ulList[li]){
	 					_this.index = [].slice.call(_this.ulList).indexOf(_this.ulList[li])
	 				}
	 			}
	 			//for(var i = 0; i<_this.channelCt.querySelector('li').length;i++){
	 			//	_this.channelCt.querySelectorAll('li')[i].classList.remove('active')
	 			//}
	 			console.log('_this.temporaryIndex')

	 			if(_this.temporaryIndex === 0){
	 				_this.channelCt.querySelectorAll('li')[_this.temporaryIndex].classList.remove('active')
	 			}

	 			if(_this.temporaryIndex){
	 				_this.channelCt.querySelectorAll('li')[_this.temporaryIndex].classList.remove('active')
	 			}


	 			console.log('---------------')
	 			_this.temporaryIndex = _this.index
	 			e.target.classList.add('active')

	 		}

	 	})

	 	this.navBackBtn.addEventListener('click',function(){
	 		if(parseInt(getComputedStyle(_this.channelCt).left) === 0){
	 			return ;
	 		}else{
	 			_this.moveLength += 60
	 			_this.channelCt.style.left = _this.moveLength + 'px'
	 		}
	 	})

	 	this.navForwardBtn.addEventListener('click',function(){
	 		if(parseInt(getComputedStyle(_this.channelCt).left) <= (420-_this.length) ) {
	 			return ;
	 		}else{
	 			_this.moveLength -= 60
	 			_this.channelCt.style.left = _this.moveLength + 'px'
	 		}
	 	}) 
 }

 getChannel.prototype.bindControl = function(){
 		var _this = this
 		this.controlPlayBtn.addEventListener('click',function(){
 			_this.controlPlay()
 			console.log(_this.controlPlayBtn.classList.contains('fa-play'))
 		})

 		this.controlBackBtn.addEventListener('click',function(){
 			_this.controlBack()
 		})

 		this.controlForwardBtn.addEventListener('click',function(){
 			_this.controlForward()
 		})
 }



 getChannel.prototype.get = function(url,data,callback,dataType){
 		//若channelCtLength = true 则
 		var _this = this
 		url += '?' + Object.keys(data).map(function(key){
 			return key +'=' + data[key]
 		}).join('&')
 		var xhr = new XMLHttpRequest()
 		xhr.responseType =  dataType||'json'
 		xhr.onload = function(){
 			console.log(_this.local)
 			_this.local = true
 			xhr.onreadystatechange = function(){
 				console.log(xhr.readyState)
 			}
 			if(xhr.readyState === 4){
 				callback(xhr.response)
 				_this.local = false
 			}
 		}
 		xhr.open('GET',url,true)
 		xhr.send()
 }

 getChannel.prototype.renderChannel = function(channels){
 		var _this = this

 		var html = channels.map(function(channel){
 			return '<li data-channel-id="'+channel.channel_id+'">'+ channel.name +'</li>'
 		}).join('')
 		 this.channelCt.innerHTML = html

 		//设置channel-ct长度
		//this.channelCt.children是类数组
 		var list = [].slice.call(this.channelCt.children)
 		list.forEach(function(li){
 			_this.length +=parseInt(getComputedStyle(li).width)
 		})
 		this.channelCt.style.width = _this.length+'px'

 		//获取channelCt的子元素集合  在this.channelCt.addEventListener中获取被点击li在当前列表的序列
 		this.ul = document.querySelector('.nav .channel .channel-ct')
	 	this.ulList = this.ul.querySelectorAll('li')
	 	console.log(this.ulList)
 }

 getChannel.prototype.renderSong = function(song){
 		var _this = this
 		//this.title.innerText = song.title
 		//this.auther.innerText = song.artist
 		this.get(song.lrc,{},function(ret){
 			//_this.lrc.innerText = originLrc.replace(/\[(.*)\]/g,function(){
 			//	return ''
 			//})
 			_this.songLrc = ret //将歌词赋值给全局变量
 			//获取原始歌词
			_this.getOriginLrc()
 		},'text')
 		//获取封面
 		this.img(song.picture)
 		//获取歌词
 		
 }

 getChannel.prototype.play = function(url){
 		this.music.src = url
 		this.music.play()
 		if(this.controlPlayBtn.classList.contains('fa-play')){
 			this.controlPlayBtn.classList.toggle('fa-play')
 			this.controlPlayBtn.classList.toggle('fa-pause')
 		}
 }

 getChannel.prototype.controlPlay = function(){
 		if(!this.music.src){
 			return;
 		}else{
 			if(this.controlPlayBtn.classList.contains('fa-play')){
 				this.music.play()
 				console.log('play')
 			}else{
 				this.music.pause()
 				console.log('pause')
 			}
 			console.log('control')
 			this.controlPlayBtn.classList.toggle('fa-play')
 			this.controlPlayBtn.classList.toggle('fa-pause')
 		}
 }


 getChannel.prototype.controlBack = function(){
 		var _this = this
 		clearInterval(_this.timer)
 		var channelId = this.channelCt.children[this.index].getAttribute('data-channel-id')
		this.get('https://jirenguapi.applinzi.com/fm/getSong.php',{channel:channelId},function(ret){
		 		_this.renderSong(ret.song[0])
			 	//获取原始歌词
			 	//_this.getOriginLrc()
		 		_this.play(ret.song[0].url)
		})
 }

 getChannel.prototype.controlForward = function(){
 		var _this = this
 		clearInterval(_this.timer)
 		var channelId = this.channelCt.children[this.index].getAttribute('data-channel-id')
		this.get('http://api.jirengu.com/fm/getSong.php',{channel:channelId},function(ret){
			 	_this.renderSong(ret.song[0])
			 	//获取原始歌词
			 	//_this.getOriginLrc()
			 	_this.play(ret.song[0].url)
		})
 }

 getChannel.prototype.musicSet = function(){
 		var _this = this
 		//音乐结束时自动播放下一首
	  this.music.addEventListener('ended',function(){
 				_this.controlForward()
 				clearInterval(_this.timer)
 				console.log('_this.timer')
 		})

 		//获取当前播放时间和进度条
 		this.music.addEventListener('playing',function(){
 			 _this.lrcMoveTop = 0//每次歌词移动的高度
 			//获取原始歌词
 			//_this.getOriginLrc()
 			//进度条和同步歌词
 			_this.timer = setInterval(function(){
 				_this.updateProgress()
 			//同步歌词
 				_this.renderLrc(_this.lrcNodesArrary)
 			},1000)
 		})
 		//音乐停止时 清除计时器
 		this.music.addEventListener('pause',function(){
 				clearInterval(_this.timer)
 		})

 		//拖动进度条
 		this.progressBar.addEventListener('click',function(e){
 				var x = e.offsetX,
 						duration = _this.music.duration,
 						percent = x / parseInt(getComputedStyle(_this.progressBar).width)
 				_this.music.currentTime = percent*duration
 		})

 		this.volumeBtn.addEventListener('click',function(){
 			console.log(_this.volumeBtn.classList.contains('fa-volume-up'))
 			if(_this.volumeBtn.classList.contains('fa-volume-up')){
 				this.temporaryVolume = _this.music.volume
 				_this.music.volume = 0
 			}else{
 				_this.music.volume = this.temporaryVolume

 			}
 			 	_this.volumeBtn.classList.toggle('fa-volume-up')
 				_this.volumeBtn.classList.toggle('fa-volume-off')
 		})

 		this.volumeProgressBar.addEventListener('click',function(e){
 			var x = e.offsetX,
 					currentVolume = _this.music.volume,
 					percent = x/parseInt(getComputedStyle(_this.volumeProgressBar).width)

 					_this.volumeProgressNow.style.width = percent*100+'%'
 					_this.music.volume = percent
 		})

 		//音量改变时触发的事件
 		this.music.addEventListener('volumechange',function(){
 			 var currentVolume = _this.music.volume
 			 console.log('volume:')
 			 console.log(currentVolume)
 			 _this.volumeProgressNow.style.width = currentVolume*100 +'%'
 		})
 }

//进度条和显示时间
 getChannel.prototype.updateProgress = function(){
 		var _this=this
 		var currentTime = this.music.currentTime ,
 			  duration = this.music.duration,
 			  minutes = parseInt(currentTime / 60 ),
 			  seconds = parseInt(currentTime % 60 )+'',
 			  precent = currentTime / duration
 			  //如果seconds的长度为2则seconds = seconds 否则seconds = '0' + seconds
 			  seconds = seconds.length == 2? seconds : '0'+seconds
 			  this.timeNode.innerText = '0' + minutes +':' + seconds
 			  this.progressNow.style.width = precent*100 + '%'
 }

 //获取图片 是图片旋转
 getChannel.prototype.img = function(url){
 	 	var _this = this
 		this.picture = document.querySelector('.music .background img')
 		this.circle = document.querySelector('.music .background .circle')
 	 	this.picture.src = url

 	 	this.circle.style.animation = 'null'
 	 	console.log(getComputedStyle(this.circle).animation)
 	 	this.circle.style.animation = '60s rotate infinite linear'

 }

//同步歌词
 getChannel.prototype.renderLrc = function(){
 	//数组元素越界所以var i = 0;i<this.lrcNodesArrary.length;
 		for(var i = 0;i<this.lrcNodesArrary.length;i++){
 				if(this.lrcNodes[i].getAttribute('data-time') <= this.music.currentTime && this.lrcNodes[i+1].getAttribute('data-time') >this.music.currentTime ){
				 		if(i>=1){
				 			if(this.lrcNodes[i-1]!=this.lrcNodes[i]){
				 				this.lrcNodes[i-1].classList.remove('highLight')
				 				this.lrc.style.top = -this.lrcNodesArrary[i].moveTop + 'px'
				 			}
				 		}
				 		//this.lrc.style.top = -this.lrcNodesArrary[i-1].moveTop + 'px'
				 		this.lrcNodes[i].classList.add('highLight')
				 		break;
	 			}
 		}
 }

//获取歌词 将歌词插入dom中
 getChannel.prototype.getOriginLrc = function(){
 	 		var _this = this,
 	 				height = -50,
 					reg = /\[(\d{2}):(\d{2})\.(\d{2})\]([^\[]*)/g,
 					html = '';

 			this.lrcNodesArrary = []

 			console.log('this.songLrc')
 			console.log(this.songLrc)
 			this.songLrc.replace(reg,function(match,p1,p2,p3,p4){
 					var minutes = parseInt(p1)*60,
 							seconds = parseInt(p2) + parseInt(p3)/100,
 							currentTime = minutes+seconds
 					return _this.lrcNodesArrary.push({
 							'time':currentTime,
 							'lrc': p4
 						})
 			})
 			this.lrcNodesArrary.forEach(function(obj){
 				return html+= '<p data-time="' + obj.time +'">' + obj.lrc +'</p>'
 			})
 			_this.lrc.innerHTML = html

 			this.lrcNodes = document.querySelectorAll('.music .content .lrc p')
 			this.lrcNodesArrary = [].slice.call(this.lrcNodes)

 			for(var i = 0; i<this.lrcNodes.length;i++){
 				height += parseInt(getComputedStyle(this.lrcNodes[i]).height)
 				this.lrcNodesArrary[i].moveTop = height
 			}
 			console.log(this.lrcNodesArrary)
 }

 return getChannel
})