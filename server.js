const express = require('express');
const mongoose = require('mongoose');
const BrandName = require('./model')
const app = express();

app.use(express.json())

mongoose.connect("mongodb+srv://ByteBuddies:ByteBuddies@cluster0.ssrv1hi.mongodb.net/?retryWrites=true&w=majority").then(
    ()=> console.log('DB Connected...')
    ).catch(err=> console.log(err))

app.get('/',(req,res)=>{
    res.send("Hello World!")
})

app.post('/addbrands',async (req,res) => {
    const {brandname} =req.body
try{
    const newData = new BrandName({brandname})
    await newData.save();
    return res.json(await BrandName.find())

}
catch(error) {
    console.log(error.massage)
}
})

app.get('/getallbrands' ,async (req,res)=> {
    try{
        const allData= await BrandName.find()
        return res.json(allData)

    }
    catch(err){
        console.log(err.massage)
    }
})

app.get('/getallbrands/:id',async(req,res)=>{
    try{
        const Data = await BrandName.findById(req.params.id)
        return res.json(Data)
    }
    catch(err){
        console.log(err.massage)
    }

})

app.delete('/deletebrand/:id',async(req,res)=>{
    try{
        const Data = await BrandName.findByIdAndDelete(req.params.id)
        return res.json(await BrandName.find())
    } 
    catch(err){
        console.log(err.massage)
    }
})

app.listen(3000,()=>console.log("server running......."))