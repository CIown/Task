
app.get('/loadMore', function(req, res) {

  var curIdx = req.query.index
  var len = req.query.length
  var data = []
  var imgUrl = [
  /*
  "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504876391185&di=c748a9c748596c1d0197c3ff38bc99a4&imgtype=0&src=http%3A%2F%2Fwww.rizhi123.com%2Fueditor%2Fphp%2Fupload%2Fimage%2F20170116%2F1484533362694503.jpg",
  "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504876412799&di=eaf8f1d7f96c4b1be298ba4aeb3a658e&imgtype=jpg&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F314e251f95cad1c8cecf8ee7763e6709c83d51fd.jpg",
  "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504876421611&di=0dea726df56fcb01e674e2629b4b5a1e&imgtype=jpg&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F6c224f4a20a44623fbe8d0a39122720e0df3d7d5.jpg",
  "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504876391653&di=ab5060064929d6b3a20c14c534da9eab&imgtype=0&src=http%3A%2F%2Fwww.tu123.cn%2Fuploads%2Fallimg%2F2016%2F04%2F1-16040411110U49.jpg",
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
  */
 "https://placehold.it/100x100/red/fff",
 "https://placehold.it/100x200/red/fff",
 "https://placehold.it/100x300/red/fff",
 "https://placehold.it/100x400/red/fff",
 "https://placehold.it/100x500/red/fff",
 "https://placehold.it/100x600/red/fff",
 "https://placehold.it/100x100/red/fff",
 "https://placehold.it/100x400/red/fff",
 "https://placehold.it/100x100/red/fff",
 "https://placehold.it/100x400/red/fff",
 "https://placehold.it/100x200/red/fff",
 "https://placehold.it/100x100/red/fff",
 "https://placehold.it/100x200/red/fff",
 "https://placehold.it/100x300/red/fff",
 "https://placehold.it/100x400/red/fff",
 "https://placehold.it/100x500/red/fff",
 "https://placehold.it/100x100/red/fff"


  ]


  for(var i = 0; i < len; i++) {
    data.push(imgUrl[parseInt(curIdx)+i])
  }

    res.send(data);

});

