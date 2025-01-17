const router = require('express').Router();
const RabbitMQService = require('../rabbitMQService');
const db = require('../models');

router.get('/', async (req, res) => {
    let jobs;
    try{
        jobs = await db.Job.findAll();
    } catch(error){
        console.error('Error getting jobs:', error);
        return res.status(500).send('Error getting jobs');
    }
    // console.log('Jobs:', jobs);
    return res.json(jobs);
});

// add a new route that get job by id
router.get('/:id', async (req, res) => {
    let job;
    try{
        job = await db.Job.findByPk(req.params.id);
    } catch(error){
        console.error('Error getting job:', error);
        return res.status(500).send('Error getting job');
    }
    console.log('Job:', job);
    return res.json(job);
});

module.exports = router;