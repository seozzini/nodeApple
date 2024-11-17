const express =  require('express');
const app = express();

app.use(express.static(__dirname+'/public')); //css파일 등
app.set('view engine', 'ejs');

const { MongoClient } = require('mongodb');

let db;
const url = 'mongodb+srv://admin:qwer1234@cluster0.56s0p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
new MongoClient(url).connect().then((client)=>{
  console.log('DB연결성공');
  db = client.db('forum');

  app.listen(3000,()=>{
    console.log('http://localhost:3000 에서 서버 실행중');
  })
}).catch((err)=>{
  console.log(err);
})

app.get('/',(req, res)=>{
  res.sendFile(__dirname + '/index.html');
})

app.get('/news',(req,res)=>{
  // db.collection('post').insertOne({title: '어쩌구'});
  res.send('오늘의 뉴스: 오늘 비옴');
})

app.get('/shop',(req,res)=>{
  res.send('쇼핑 페이지임');
})

app.get('/about',(req,res)=>{
  res.sendFile(__dirname + '/about.html');
})

app.get('/list', async (req,res)=>{
  let result = await db.collection('post').find().toArray(); //모든 collection 출력
  // res.send(result[0].title); //응답은 1번만 가능
  res.render('list.ejs', { posts : result })
});

app.get('/time', (req,res)=>{
  let time = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });;
  console.log(time);
  res.render('time.ejs', {serverTime:time})
});

