const express = require('express');
const router = express.Router();
const SpeakerRoute = require('./speakers');
const FeedbackRoute = require('./feedback');

/* GET home page. */
module.exports = (params) => {
  let {speakers,homedata} = params ;
  router.get('/',async (req,res,next) => {
    let speakerList = await speakers.getSpeakerList();
    let allArtwork = await speakers.getAllArtwork();
    let homecontent = await homedata.getdata();
    res.render('index',{speakerList,allArtwork,homecontent});
  });
  router.use('/speakers',SpeakerRoute(params));
  router.use('/feedback',FeedbackRoute(params));
  return router;
  
}
