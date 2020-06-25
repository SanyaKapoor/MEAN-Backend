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
        vacancy:req.body.vacancy,
        participants: req.body.participants
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
// Need to update

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
        pool.participants=pool.participants.concat(req.body.participants);
        pool.save((err, pool)=>{
                if (err)
                res.status(500).json({errmsg:err});
            res.status(200).json({msg: pool});
        });

    })
    });

router.put('/addParticipant',(req, res, next) => {
    Pool.findById(req.body._id,(err,pool)=>{
            if(err)
            res.status(500).json({errmsg:err});
        if(pool.participants.length < pool.vacancy)
        {
        pool.participants=pool.participants.concat(req.body.participants);
        pool.save((err, pool)=>{
                if (err)
                res.status(500).json({errmsg:err});
            res.status(200).json({msg: pool});
        });
        }
        else {
            res.status(200).json({msg: "Limit Reached"});
        }
    })
    });

router.put('/delParticipant',(req, res, next) => {
    Pool.findById(req.body._id,(err,pool)=>{
            if(err)
            res.status(500).json({errmsg:err});
        for(var i = pool.participants.length - 1; i >= 0; i--) {
            if(pool.participants[i] === req.body.participants) {
                pool.participants.splice(i, 1);
            }
        }
        pool.save((err, pool)=>{
                if (err)
                res.status(500).json({errmsg:err});
            res.status(200).json({msg: pool});
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