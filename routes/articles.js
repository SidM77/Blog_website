const express = require('express');
const router = express.Router();
const Article = require('./../models/article')
const slugify = require('slugify')
let articleswitch

router.get('/new', (req, res) => {
  res.render('articles/new',{article:new Article()})
})

router.get('/:slug',async(req,res)=>{
  const article = await Article.findOne({slug:req.params.slug})
  if(article==null) res.redirect('/')
  res.render('articles/show',{article:article})
})

router.post('/',async (req,res)=>{
  let article = new Article({
    title:req.body.title,
    description: req.body.description,
    markdown: req.body.markdown
  })
  try{
    await article.save()
    res.redirect(`/articles/${article.slug}`)
  }catch(e){
    console.log(e)
    res.render(`articles/new`,{article:article})
  }
})

router.get('/edit/:slug', async(req,res)=>{
  const article = await Article.findOne({slug:req.params.slug})
  articleswitch = article.id
  res.render(`articles/edit`,{article:article})
})

router.post('/edit',async(req, res)=>{
  const article= await Article.findById(articleswitch)
  await Article.updateOne({_id:article.id},
    {$set:{title:req.body.title, 
    description:req.body.description,
    markdown:req.body.markdown,
    slug: slugify(req.body.title,{lower:true,strict:true})
  }})
  console.log(article)
    try{
      res.redirect(`/articles/${article.slug}`)
    }catch(e){
      console.log(e)
      res.redirect(`/`)
    }
})


router.delete('/:id',async(req,res)=>{
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})
module.exports = router;