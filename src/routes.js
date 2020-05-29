const { 
    uniqueNamesGenerator, 
    adjectives, 
    names, 
    animals } 
    = require('unique-names-generator');

const newTable = (req, res) => {
   const name = uniqueNamesGenerator({
        dictionaries: [names, adjectives, animals],
        separator: "-",
        style: "capital",
        length: 3
    })
    .replace('-','-the-')
    .replace(new RegExp(' ','g'), '-');

    
    res.send({ table: name });
};

const joinTable = (req, res) => {
    console.log('join request');
};

module.exports = { joinTable, newTable };