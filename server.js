const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/productModel');
const Employee = require('./models/employee')

const Company = require('./models/company');



app.use(express.json())  // this is middleware



//app.use(express.json()) is commonly used in combination with the Express.js framework to enable JSON body parsing for incoming HTTP requests. 

///routes

app.get('/', (req, res) => {
    res.send('Welcome to Node JS APi')
})


app.get('/hello', (req, res) => {
    res.send('Welcoe to Node in the  world and Be happy')
})




//  For creating the new record

app.post('/product', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
})




// creating the employee record

app.post('/employee', async (req, res) => {
    try {
        const employee = await Employee.create(req.body)
        res.status(200).json(employee);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
})



// Creating the company record
app.patch('/company', async (req, res) => {
    try {
        const company = await Company.create(req.body)
        res.status(200).json(company);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
})
//  fetching all the data

app.get('/allproducts',async(req,res)=>
{
    try {
        const allproduct= await Product.find({})

        res.status(200).json(allproduct)
        
    } catch (error) {

        res.status(500).json({"message":error.message})
        
    }
})

// For fetching the data  with pagination

 app.get('/products', async (req, res) => {
    
    let {page,limit}=req.query;

    if(!page)page=1;
    if(!limit)limit=10;

    const skip=(page-1)*10;
   
    try {
        const products = await Product.find({}).skip(skip).limit(limit);
        res.status(200).json(products);

    } catch (error) {

        res.status(500).json({ message: error.message })
    }

    
})


    


//  find the data by id
app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;  // here request.param is an object containing properties  const {id}=req.params ; mapped to the named route parameters. 
        const product = await Product.findById(id);
        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})



// update the data

app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({ message: `can not find any product by id ${id}` })
        }

        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Delete the product

app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: `can not find any product by id ${id}` })
        }

        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

mongoose.set("strictQuery", false)

mongoose.
    connect('mongodb+srv://atulgupta:fRfEcKa0VEAWtoEI@cluster0.iluygdw.mongodb.net/crud-first')
    .then(() => {
        app.listen(3000, () => {
            console.log('NOde Api is on port 3000')
        })
        console.log('Connected to MONGodb ')
    }).catch((error) => {
        console.log(error)
    })