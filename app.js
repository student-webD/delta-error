const express= require("express");
const app= express();
const mongoose =require("mongoose");
const Listing =require("./models/listing.js");
const path= require("path");
const methodOverride= require("method-override");


const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
 
main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}
    app.set("view engine","ejs");
    app.set("/views",path.join(__dirname,"/views"));
    app.use(express.urlencoded({extended:true}));
    app.use(methodOverride("_method")); 

    app.get("/",(req ,res)=>{
    res.send("Hi, I am root");
});


  

//Index Route
app.get("/listings",async(req, res)=>{
   const allListings=await Listing.find({});
   res.render("\listings/index.ejs",{ allListings });
    });
// New Route
app.get("/listing/new",(req,res)=>{
    res.render("\listing/new.ejs");
});

  

//Show Route
app.get("/listings/:id",async(req,res)=>{
    let{id}=req.params;
    const listing= await Listing.findById(id);
   res.render("\listings/show.ejs",{listing});
});
//create Route
app.post("/listings",async (req,res)=>{
    const newListing = new Listing(req.body.listings);
    await newListing.save();
    res.redirect("\listings");
});
//edit route
app.get("/listing/:id/edit",async (req, res)=>{
    let {id}= req.params;
    const listing= await Listing.findById(id);
    res.render("\listings/edit.ejs",{listing});
});
//upadate route
app.put("/listing/:id",async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpadate(id,{...req.body.listing});
    res.redirect(`\listings/${id}`);
});
//delete route
app.delete("/listings/:id",async(req, res)=>{
    let{id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListings);
    res.redirect("/listings");
});
//app.get("/testListing",(req,res)=>{
   // let sampleListing= new Listing({
     //   title:"My New Villa",
       // description:"By the Beach",
        //price:1200,
        //location:"goa",
        //country:"India",
    //});
//})
app.listen(8080 ,()=>{
    console.log("sever is listening to port 8080");
});