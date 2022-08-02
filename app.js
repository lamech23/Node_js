const express =require('express')
const morgan = require('morgan')
const mongoose =require('mongoose')
//express app
const app =express() 

//connect to mongo db
const dbURI ='mongodb+srv://<monga>:<123mongo>@node-tuts.fbebzae.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result)=>console.log('Connected to database'))
.catch((err)=>console.log(err))
 // to register view engines
 app.set('view engine','ejs')


//listen for request
app.listen(3000)

//middlewear and static files
app.use(express.static('public'))

// #### middlewares ####
// app.use((req,res,next)=>{
//     console.log('new request made ')
//     console.log('host:',req.hostname)
//     console.log('path:',req.path)
//     console.log('method:',req.method)
//     next()
// })
// app.use((req,res,next)=>{
//     console.log('In the next middleware ')
  
//     next()
// })





app.use(morgan('dev'))

app.get('/',(req,res)=>{
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];
    // res.send('<p> Home page</p>')
    res.render('index',{title:'Home',blogs})
})
app.get('/about',(req,res)=>{
    // res.send('<p> about page</p>')
res.render('about',{title:'About'})
})
 app.get('/Blogs/create',(req,res)=>{
    res.render('create',{title:'Create'})
 })



//404 page
app.use((req,res)=>{
    res.status(404).render('404',{title:'404'})

})