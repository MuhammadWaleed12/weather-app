const path = require("path");
const express = require("express");
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const weatherStack=require('./utils/weatherStack')
const app = express();
const port=process.env.PORT||3000
// Define Path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath=path.join(__dirname,'../templates')
const partialpath=path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialpath)
// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:"lahore"
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About me",
        name:"Lahore"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        name:"Lahore"
    })
})


app.get("/weather", (req, res) => {
    if(!req.query.address){
        return res.send({
            error
        })
    }
    else{
        geocode(req.query.address,(err,{latitude,longitude,location}={})=>{ 
            if(err){
                return res.send({error})
            }
         
         weatherStack(latitude,longitude,(err,weatherData)=>{
                    if(err){
                         return res.send({
                           error
                        })
                    }
                    
                        res.send({ location: location, forecast:weatherData.description,address:req.query.address });
                
                    
                })
          
           
        })
       
    }
 
  
});

app.get("/products",(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"You mustprovide Search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"404",
        name:"Lahore",
        msg:"Help article not found"
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:"Lahore",
        msg:"Page not Found"
    })
})
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
