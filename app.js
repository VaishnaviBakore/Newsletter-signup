const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const https=require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const app=express();


app.use(express.static("public"));//makes the static files public eg.styles.css

app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const fname=req.body.fname;
  const lname=req.body.lname;
  const email=req.body.email;
  const data={
    members:[
      {
        email_address: email,
        status:"subscribed",
        merge_fields:{
          FNAME:fname,
          LNAME:lname
        }
      }
    ]
  };
  mailchimp.setConfig({
    apiKey: "cefd885bcc01f9a3461e58bb52f91560-us21",
    server: "us21",
  });

  const run = async () => {
    try{
    const response= await mailchimp.lists.batchListMembers("532786adb", data);
    console.log(response);
    res.sendFile(__dirname+"/success.html");
  }catch(err){
    res.sendFile(__dirname+"/failure.html");
  }

  };
  // if(response.statusCode==200){
  //
  // }else{
  //   res.sendFile(__dirname+"/failure.html");
  // }
  run();

});

app.post("/failure",function(req,res){
  res.redirect("/");
});
app.listen(3000,function(){
  console.log("Server started");
});
// const jsonData=JSON.stringify(data);
// const url="https://us21.api.mailchimp.com/3.0/lists/532786adb6";
// const options={
//   method:"POST",
//   auth:"vaishnavi1:11755e4bc824c4dc323aae85789f69cb-us21"
// }
// const request=https.request(url,options,function(response){
//   response.on("data",function(data){
//     // console.log(JSON.parse(data));
//   })
// })
//
// // request.write(jsonData);
// request.end();
// 11755e4bc824c4dc323aae85789f69cb-us21
//list id/audience id 532786adb6.
