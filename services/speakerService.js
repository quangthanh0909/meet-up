const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
class speakerService{
  constructor(dsn){
    this.dsn = dsn;
  };
  async getNames() {
    let speakers = await this.getdata()
    return speakers.map((speaker) => ({name : speaker.name, shortname:speaker.shortname}));
  };
  async getdata(){
    let data = await readFile(this.dsn,'utf-8');
    return JSON.parse(data).speakers;
  };
  async getSpeakerList(){
    let speakers = await this.getdata();
    return speakers.map((speaker) => ({title:speaker.title,name:speaker.name,shortname:speaker.shortname
    }))
  };
  async getAllArtwork(){
    let speakers = await this.getdata();
    return speakers.reduce((acc,cur) => {
      if (cur.artwork) {
        acc.push(...cur.artwork)
      }
      return acc;
    },[])
  }
}
module.exports = speakerService;
