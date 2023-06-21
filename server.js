const mongoose = require('mongoose')
const express = require('express')
const app = express();
const articleRouter = require('./routes/articles')
const Article=require('./models/article')
const methodOverride=require('method-override')
mongoose.connect('mongodb://127.0.0.1:27017/blog')
app.listen(5000);






app.get('/', async(req, res) => {
  const articles= await Article.find().sort({createdAt:'desc'})
  res.render('articles/index',{articles:articles});
});

app.use(express.urlencoded({extended:false}))

app.use(methodOverride('_method'))

app.set('view engine', 'ejs');
app.use('/articles', articleRouter);
