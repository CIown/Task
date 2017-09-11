
app.get('/loadMore', function(req, res) {

  var curIdx = req.query.index
  var len = req.query.length
  var data = []
  var imgUrl = [
  "http://i4.download.fd.pchome.net/t_960x600/g1/M00/0D/15/oYYBAFS0sT-IehTsABfUJSKSkEsAACOIgNg4OIAF9Q9429.jpg",
  "http://i1.download.fd.pchome.net/t_960x600/g1/M00/07/0B/ooYBAFMya1iId80HAChusFY0wVQAABbpQG12XsAKG7I425.jpg",
  "http://i8.download.fd.pchome.net/t_960x600/g1/M00/08/11/ooYBAFORfSuIf74_ABbCpAvFB08AABlOwKeKrEAFsK8130.jpg",
  "http://i1.download.fd.pchome.net/t_960x600/g1/M00/08/11/ooYBAFORfNeIXZmhAA0soELe5xcAABlOwFywl0ADSy4543.jpg",
  'http://i4.download.fd.pchome.net/t_960x600/g1/M00/0D/15/oYYBAFS0sT-IehTsABfUJSKSkEsAACOIgNg4OIAF9Q9429.jpg',
  "http://i1.download.fd.pchome.net/t_960x600/g1/M00/07/0B/ooYBAFMya1iId80HAChusFY0wVQAABbpQG12XsAKG7I425.jpg",
  "http://i8.download.fd.pchome.net/t_960x600/g1/M00/08/11/ooYBAFORfSuIf74_ABbCpAvFB08AABlOwKeKrEAFsK8130.jpg",
  "http://i1.download.fd.pchome.net/t_960x600/g1/M00/08/11/ooYBAFORfNeIXZmhAA0soELe5xcAABlOwFywl0ADSy4543.jpg",
  'http://i4.download.fd.pchome.net/t_960x600/g1/M00/0D/15/oYYBAFS0sT-IehTsABfUJSKSkEsAACOIgNg4OIAF9Q9429.jpg',
  "http://i1.download.fd.pchome.net/t_960x600/g1/M00/07/0B/ooYBAFMya1iId80HAChusFY0wVQAABbpQG12XsAKG7I425.jpg",
  "http://i8.download.fd.pchome.net/t_960x600/g1/M00/08/11/ooYBAFORfSuIf74_ABbCpAvFB08AABlOwKeKrEAFsK8130.jpg",
  "http://i1.download.fd.pchome.net/t_960x600/g1/M00/08/11/ooYBAFORfNeIXZmhAA0soELe5xcAABlOwFywl0ADSy4543.jpg",
  'http://i4.download.fd.pchome.net/t_960x600/g1/M00/0D/15/oYYBAFS0sT-IehTsABfUJSKSkEsAACOIgNg4OIAF9Q9429.jpg',
  "http://i1.download.fd.pchome.net/t_960x600/g1/M00/07/0B/ooYBAFMya1iId80HAChusFY0wVQAABbpQG12XsAKG7I425.jpg",
  "http://i8.download.fd.pchome.net/t_960x600/g1/M00/08/11/ooYBAFORfSuIf74_ABbCpAvFB08AABlOwKeKrEAFsK8130.jpg",
  "http://i1.download.fd.pchome.net/t_960x600/g1/M00/08/11/ooYBAFORfNeIXZmhAA0soELe5xcAABlOwFywl0ADSy4543.jpg",
  'http://i4.download.fd.pchome.net/t_960x600/g1/M00/0D/15/oYYBAFS0sT-IehTsABfUJSKSkEsAACOIgNg4OIAF9Q9429.jpg',
  "http://i1.download.fd.pchome.net/t_960x600/g1/M00/07/0B/ooYBAFMya1iId80HAChusFY0wVQAABbpQG12XsAKG7I425.jpg",
  "http://i8.download.fd.pchome.net/t_960x600/g1/M00/08/11/ooYBAFORfSuIf74_ABbCpAvFB08AABlOwKeKrEAFsK8130.jpg",
  "http://i1.download.fd.pchome.net/t_960x600/g1/M00/08/11/ooYBAFORfNeIXZmhAA0soELe5xcAABlOwFywl0ADSy4543.jpg",
  'http://i4.download.fd.pchome.net/t_960x600/g1/M00/0D/15/oYYBAFS0sT-IehTsABfUJSKSkEsAACOIgNg4OIAF9Q9429.jpg',
  "http://i1.download.fd.pchome.net/t_960x600/g1/M00/07/0B/ooYBAFMya1iId80HAChusFY0wVQAABbpQG12XsAKG7I425.jpg",
  "http://i8.download.fd.pchome.net/t_960x600/g1/M00/08/11/ooYBAFORfSuIf74_ABbCpAvFB08AABlOwKeKrEAFsK8130.jpg",
  "http://i1.download.fd.pchome.net/t_960x600/g1/M00/08/11/ooYBAFORfNeIXZmhAA0soELe5xcAABlOwFywl0ADSy4543.jpg",
  'http://i4.download.fd.pchome.net/t_960x600/g1/M00/0D/15/oYYBAFS0sT-IehTsABfUJSKSkEsAACOIgNg4OIAF9Q9429.jpg',
  "http://i1.download.fd.pchome.net/t_960x600/g1/M00/07/0B/ooYBAFMya1iId80HAChusFY0wVQAABbpQG12XsAKG7I425.jpg",
  "http://i8.download.fd.pchome.net/t_960x600/g1/M00/08/11/ooYBAFORfSuIf74_ABbCpAvFB08AABlOwKeKrEAFsK8130.jpg",
  "http://i1.download.fd.pchome.net/t_960x600/g1/M00/08/11/ooYBAFORfNeIXZmhAA0soELe5xcAABlOwFywl0ADSy4543.jpg"
  ]

  console.log(curIdx)
  console.log(len)
  for(var i = 0; i < len; i++) {
    data.push(imgUrl[parseInt(curIdx)+i])
  }

  console.log(data)


    res.send(data);


  
});

