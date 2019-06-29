const util =require('util');
const fs = require('fs');
let readFile = util.promisify(fs.readFile);
class HomePage{
  constructor(dsn){
    this.dsn = dsn;
  };
  async getdata(){
    let data = await readFile(this.dsn,'utf-8');
    return JSON.parse(data).introduction;
  }
}
module.exports = HomePage;