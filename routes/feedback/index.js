const express = require('express');
const router = express.Router();
module.exports = (params) => {
   let {feedbacks} = params;
  router.get('/', async (req,res,next) => {   
    let feedback = await feedbacks.getdata();
    res.render('feedback/feedback',{feedback});
  })
  return router;
}