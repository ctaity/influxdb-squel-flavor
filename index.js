"use strict"

const squel = require('squel');   // to use util.inherits() from node.js

squel.flavours['influx'] = function (_squel) {
    let cls = _squel.cls;

    cls.Fill = class extends cls.Block {
        constructor(options) {
            super(options);
            this._command = '';
        }

        _toParamString() {
            return {
                text: this._command.toUpperCase(),
                values: [],
            };
        }

        fill(argument) {
            this._command = `fill(${argument})`;
        };

    }

    cls.InfluxWhere = class extends cls.WhereBlock {

        period(period){
            this.where(`time > now() - ${period}`)
        }

    }

    cls.Select = class extends cls.QueryBuilder {
        constructor(options, blocks = null) {
            blocks = blocks || [
                new cls.StringBlock(options, 'SELECT'),
                new cls.FunctionBlock(options),
                // new cls.DistinctBlock(options),
                new cls.GetFieldBlock(options),
                new cls.FromTableBlock(options),
                // new cls.JoinBlock(options),
                new cls.InfluxWhere(options),
                // new cls.Period(options),
                new cls.GroupByBlock(options),
                // new cls.HavingBlock(options),
                new cls.OrderByBlock(options),
                // new cls.OffsetBlock(options),
                // new cls.UnionBlock(options),
                new cls.Fill(options),
                new cls.LimitBlock(options)
            ];

            super(options, blocks);
        }
    }

};