const express = require('express');
const router = express.Router();

module.exports = (params) => {
  let {speakers} = params;
  router.get('/',async (req,res,next) => {
    let allSpeakers = await speakers.getdata();
    let allArtwork = await speakers.getAllArtwork();
    res.render('speakers/allspeaker',{allSpeakers,allArtwork });
  });
  router.get('/:name',async (req,res,next)=>{
    const name = req.params.name;
    let speakerNames = await speakers.getdata();
    let speakername = speakerNames.find((speaker) => speaker.shortname ==name);
    if (speakername){
        res.render('speakers/speaker-detail',{speakername});
    }else{
      next();
    }
  });

  return router;
}