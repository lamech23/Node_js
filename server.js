const  http =require('http')
const fs =require('fs')
const path = require('path')
const _= require('lodash')

 const server =http.createServer((req,res)=>{
    const num = _.random(0,100)
    console.log(num)

    const greeting= _.once(()=>{
        console.log('hello there')

    })
    greeting()
    // console.log(req.url,req.method)
    //set headers content type
    res.setHeader('content-type','text/html')
    // res.write('<p>hello my friends</p>')
    // res.write('<p>hello again my friends</p>')

    // res.end()
    let path ='./views/'
    switch(req.url){
        case '/':
            path += 'index.html'
            res.statusCode=200

            break;
        case '/about':
            path +='about.html' 
            res.statusCode=200

            break;
            //eg of redirect
        case '/about-me':
                res.statusCode=301
                res.setHeader('Location','./about')
                res.end()
    
                break;
        default:
            path +='404.html'
            res.statusCode=404
            break;       
    }

    //sending an html file
    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err)
            res.end()
        }else{
            // res.write(data)
            //or you could  pass the data in the end
            res.end(data)
        }
    })
})
server.listen(3000, 'localhost',()=>{
    console.log('listening for request on port 3000')
    
})
