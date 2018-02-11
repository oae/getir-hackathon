const bluebird = require('bluebird');
const Record = bluebird.promisifyAll(require('./model'));

module.exports = {
  searchRecord,
}

async function searchRecord(req, res, next) {

  const result = await Record.aggregateAsync([
    { 
      $match: {
        createdAt: {
          $gte: new Date(req.body.startDate),
          $lt: new Date(req.body.endDate),
        },
      },
    }, 
    {
      $redact: {
        $cond: [
          {
            $and: [
              { $gte: [{$sum: '$counts'}, req.body.minCount]},
              { $lt: [{$sum: '$counts'}, req.body.maxCount]},
            ]
          },
          '$$KEEP',
          '$$PRUNE',
        ],
      },
    }, 
    {
      $project: {
        key: '$key',
        createdAt: '$createdAt',
        totalCount: {
          $sum: '$counts',
        },
      },
    },
  ]);

  res.send({
    code: 0,
    msg: 'Success',
    records: result,
  });
  
}