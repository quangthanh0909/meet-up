const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
class feedbackService{
  constructor(dsn){
    this.dsn = dsn;
  };
  async getdata(){
    const data = await readFile(this.dsn,'utf-8');
    return JSON.parse(data);
  };
}
module.exports = feedbackService;

