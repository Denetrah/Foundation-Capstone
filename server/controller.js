require ("dotenv").config();
const axios = require("axios")
const {response} = require("express");

let users = [
    {
        username: 'today',
        pass: 'saturday'
    },
    {
        username: 'dee',
        pass: 'sam'
    }
]

module.exports = {
    getSuggestion: (req, res) => {
    let oursugg = ["Cookie Monster","Peach Cobbler","Apple Pie","New York cheesecake","Halo-Halo","Brownies","Gummy Candy"];
    const randomIndex = Math.floor(Math.random()*oursugg.length)
    res.status(200).send(oursugg[randomIndex]);
    },

    checkLoginDetails: (req, res) => {
        const {userEntered, passEntered} = req.body
        for (let i=0;i<users.length;i++){
            if(users[i].username === userEntered && users[i].pass === passEntered){
               return res.status(200).send(`Welcome`)  
            }
            // return;
        }return res.status(400).send('wrong input')
    }
}
