"use strict"

require("./influx-flavor")
const squel = require('squel').useFlavour('influx');

let query = squel.select()
    .from("year.ds_traffic")
    .field("sum(bandwith)", "bandwith")
    .group("time(1d)")
    .period('365d')
    .fill(0)
    .limit(10)

console.log(query.toString())
console.log(query.clone().where("a=1").toString())
console.log(query.toString())
