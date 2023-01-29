require('dotenv').config()
const { util } = require('chai')
const { json } = require('express')
const express = require('express')
const app = express()
// TODO: import the getCityInfo and getJobs functions from util.js
//import {getCityInfo, getJobs} from './util.js';
const utility = require('./util.js')



app.use(express.static('public'));
app.use(express.json());

 app.get('/api/city/:city', async (req, res) => {
    try{
        const {
            city,
            sort
          } = req.params
        const infoCity= await utility.getCityInfo(city)
        const infoJobs= await utility.getJobs(city)

        if(infoJobs===false && infoCity===false){
            res.status(404).json({error:'Not Found'})
        }
        else{
        const info= {cityInfo: infoCity, jobs: infoJobs}
        res.json(info).status(200) 
        } 
        
    }catch(err){
        //console.log(err)
        res.status(404).send('API not available')
    }

})

// TODO: Statically serve the public folder
// TODO: declare the GET route /api/city/:city
// This endpoint should call getCityInfo and getJobs and return
// the result as JSON.
// The returned JSON object should have two keys:
// cityInfo (with value of the getCityInfo function)
// jobs (with value of the getJobs function)
// If no city info or jobs are found,
// the endpoint should return a 404 status



module.exports = app
