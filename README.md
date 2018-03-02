# Influxdb Squel Flavor

One Paragraph of project description goes here

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
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

```

### Installing

A step by step series of examples that tell you have to get a development env running

Say what the step will be

```
npm install squel-influx-flavor

```