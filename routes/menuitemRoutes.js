const express = require('express')
const router=express.Router();
const MenuItem=require('./../models/MenuItem');
//post route to add Menu(data)
router.post('/',async (req,res)=>{
    try{
      const data=req.body//assuming the request body contains the person data
    //create a new person document using the mongoose model
  const Menu=new MenuItem(data);
  const response=await Menu.save();
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
  const data=await MenuItem.find();
  console.log('data fetched');
  res.status(200).json(data);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
      }
  })
  router.get('/:tasteType',async (req,res)=>{
    try{
      const tasteType=req.params.tasteType;//Extract the worktype from the URL parameter
      if(tasteType=='spicy'||tasteType=='sweet'||tasteType=='sour'){
      const response=await MenuItem.find({taste:tasteType});
      console.log('response fetched');
      res.status(200).json(response);
      }
      else{
        res.status(404).json({error:'Invalid taste type'});
      }
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
      }
  })
  //Update the menu data
  router.put('./:id',async (req,res)=>{
    try{
    const menuId=req.params.id;
    const updatedmenuData=req.body;
    const response=await MenuItem.findByIdAndUpdate(menuId,updatedmenuData,{
      new:true,//return the updated document
      runValidators:true,//run mongoose validation
    })
    if(!response){
      return res.status(404).json({error:'menu not found'});;
    }
    console.log('data updated');
    res.status(200).json(response);
  }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
      }
  })
  module.exports=router;