const mongoose =require("mongoose");
const Schema=mongoose.Schema;
const listingSchema= new Schema({
    title:{
        type: String,
        required: true,
    },
    description:String,
    image:{
      type:String,
        
        default:"https://images.unsplash.com/photo-1700387412251-0e747cb53b6b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8",
        set: (v) =>
        v===""
        ?"https://images.unsplash.com/photo-1700387412251-0e747cb53b6b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8"
        :v,
    },
    price: Number,
    location: String,
    country:String,
    
});
const Listing =mongoose.model("Listing", listingSchema);
module.exports=Listing;