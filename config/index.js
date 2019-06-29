const path =require('path');
module.exports = {
  development:{
    speakerData:path.join(__dirname,'../data/speakers.json'),
    feedbackData:path.join(__dirname,'../data/feedback.json')
  }
}