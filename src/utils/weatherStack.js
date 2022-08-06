const request=require('request')
const weatherStack=(lat,long,callback)=>{
  
    const url=`http://api.weatherstack.com/current?access_key=01411fc9dedc2220d0fef5a0ef94068f&query=${lat},${long}&units=f`
    request({url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect weather services',undefined)
        }
        else if(response.body.error){
            callback('Unable to find location try another search',undefined)
        }
        else{
            callback(undefined,{
                description:response.body.current.weather_descriptions[0],
                tempratuere:response.body.current.feelslike
               
            })
          
        }
       
    })
}
module.exports=weatherStack