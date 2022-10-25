//import { config } from 'dotenv';
//import { dbConnect } from '../configuration/dbConnect.js'

require('dotenv').config()
const dbConnect = require('../configuration/dbConnect.js');
console.log(process.env.DB_URI);
console.log(dbConnect);
async function connectToDB(){
    await(dbConnect);
}

connectToDB();
