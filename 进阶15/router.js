app.get('/getNews',function(req,res){
	var news = [
{content: '内容3'},
{content: '内容4'},
{content: '内容5'},
{content: '内容6'},
{content: '内容7'},
{content: '内容8'},
{content: '内容9'},
{content: '内容10'},
{content: '内容11'},
{content: '内容12'},
{content: '内容13'},
{content: '内容14'},
{content: '内容15'},
{content: '内容16'},
{content: '内容17'},
{content: '内容18'},
{content: '内容19'},
{content: '内容20'},
{content: '内容21'},
{content: '内容22'},
	];


  var count = req.query.count;
	var len = 5;
	var retnews = news.slice(count*len,count*len+len)

	res.send(retnews);
})