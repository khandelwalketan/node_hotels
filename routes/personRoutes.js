const express = require('express')
const router=express.Router();
//post route to add a person(data)
const Person=require('./../models/person');
router.post('/',async (req,res)=>{
    try{
      const data=req.body//assuming the request body contains the person data
    //create a new person document using the mongoose model
  const newPerson=new Person(data);
  const response=await newPerson.save();
  console.log('data saved');
  res.status(200).json(response);
  
  }
  catch(err){
  console.log(err);
  res.status(500).json({error:'Internal Server Error'});
  }
  
  })

  //GET method to get the person data
router.get('/',async (req,res)=>{
    try{
  const data=await Person.find();
  console.log('data fetched');
  res.status(200).json(data);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
      }
  })

  router.get('/:worktype',async (req,res)=>{
    try{
      const worktype=req.params.worktype;//Extract the worktype from the URL parameter
      if(worktype=='chef'||worktype=='manager'||worktype=='waiter'){
      const response=await Person.find({work:worktype});
      console.log('response fetched');
      res.status(200).json(response);
      }
      else{
        res.status(404).json({error:'Invalid work type'});
      }
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
      }
  })
  module.exports=router;