const mongoose=require('mongoose')

const productSchema=mongoose.Schema(
    {
        name:
        {
            type:String,
            required:[true,"Please enter a product name"]
        },

        quantity:{

            type:Number,
            required:true,
            default:0

        },

        price:
        {
            type:Number,
            required:true,
        },
        image:{
            type:String,
            required:false,
        }
    },
        {
            timestamp: true
        }

)


const  Product=mongoose.model('Product',productSchema);

//  addfields in product by using aggregation

Product.aggregate([
    {
        $addFields:{
            discountPrice:{$sum:['$price',10]}
        }
        
    },

    {$sort:{price:1}},
    {$skip:3},
    {$limit:3},
    {$match:{'quantity':12}}
    

])
.then(result=>
    {
        console.log(result);
    })

    .catch(error=>{
        console.log(error)

    });
module.exports=Product;