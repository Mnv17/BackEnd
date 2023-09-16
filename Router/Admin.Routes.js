const express = require("express");
const { CarsModel } = require("../Models/Cars.Model");
const AdminRouter = express.Router();

AdminRouter.get("/cars", async (req,res)=>{
    const Carsdata = await CarsModel.find();
    try{
        res.status(200).json({Carsdata});
    }
    catch(err){
        res.status(400).json({err});
    }
});

AdminRouter.post("/createcars", async (req,res)=>{
    const data = req.body;

    try{
        const newCar = new CarsModel(data);
        await newCar.save();
        res.status(200).json({msg:"Car Created Succefully!!"});
    }
    catch(err){
        res.status(400).json({err, msg:"Something went Wrong"});
    }
});

AdminRouter.patch("/editCar/:id", async (req,res)=>{
    const {id} = req.params;
    const data = req.body;
    const carData = await CarsModel.findOne({_id:id});
    if(carData){
        try{
            await CarsModel.findOneAndUpdate({_id:id}, data);
            res.status(200).json({msg:"Car Updated Succefully!!"});
        }
        catch(err){
            res.status(400).json({err, msg:"Something went Wrong"});
        }
    }
    else{
        res.status(400).json({msg:"No data found!!"});
    }
    
});

AdminRouter.delete("/deleteCar/:id", async (req,res)=>{
    const {id} = req.params;
    const carData = await CarsModel.findOne({_id:id});
    if(carData){
        try{
            await CarsModel.findOneAndDelete({_id:id});
            res.status(200).json({msg:"Car Deleted Succefully!!"});
        }
        catch(err){
            res.status(400).json({err, msg:"Something went Wrong"});
        }
    }
    else{
        res.status(400).json({msg:"No data found!!"});
    }
    
});

module.exports = {
    AdminRouter,
  };