var express = require('express');
var router = express.Router();
var Pool = require('../models/dataSchema');

router.post('/create',(req, res, next) => {
    var newPool = new Pool({
        name:req.body.name,
        to:req.body.to,
        from:req.body.from,
        date:req.body.date,
        time:req.body.time,
        vacancy:req.body.vacancy
    });
    newPool.save((err, pool)=>{
        if(err)
        res.status(500).json({errmsg:err});
        res.status(200).json({msg:pool});
    })
    });


router.get('/read',(req, res, next) => {
    Pool.find({},(err,pools)=>{
        if(err)
        res.status(500).json({errmsg:err});
    res.status(200).json({msg:pools});
   });
   });


router.put('/update',(req, res, next) => {
    Pool.findById(req.body._id,(err,pool)=>{
        if(err)
            res.status(500).json({errmsg:err});
        pool.name=req.body.name;
        pool.to=req.body.to;
        pool.from=req.body.from;
        pool.date=req.body.date;
        pool.time=req.body.time;
        pool.vacancy=req.body.vacancy;
        pool.save((err, pool)=>{
            if (err)
                res.status(500).json({errmsg:err});
            res.status(200).json({mag: pool});
        });

    })
    });


router.delete('/delete/:id',(req, res, next) => {
    Pool.findOneAndRemove({_id:req.params.id}, (err,pool)=>{
        if(err)
            res.status(500).json({errmsg:err});

        res.status(200).json({msg: pool});
    })
});

module.exports = router;