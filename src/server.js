const redis = require('redis');

const { promisify } = require('util');
const { 
    uniqueNamesGenerator, 
    adjectives, 
    names, 
    animals } 
    = require('unique-names-generator');

class GameServer {

    constructor(config){
        this.config = config;
        this.db = redis.createClient();
    }
    
    async getTable(tableId){
        const setnx = promisify(this.db.setnx).bind(this.db);
        const get = promisify(this.db.get).bind(this.db);
        const table = {
            id: tableId,
            players: []
        };

        while(!table.id){
            
            table.id = this.genTableName();
            try{
                let res = await setnx('table#' + table.id, JSON.stringify(table));
                if(res != 1){
                    table.id = undefined;
                } else {
                    return table;
                }
            } catch (err) {
                console.log(err);
            }
        }
        return JSON.parse(get(tableId));
    }

    genTableName(){
        return uniqueNamesGenerator({
            dictionaries: [names, adjectives, animals],
            separator: "-",
            style: "capital",
            length: 3
        })
        .replace('-','-the-')
        .replace(new RegExp(' ','g'), '-');
    }

}

module.exports = GameServer;