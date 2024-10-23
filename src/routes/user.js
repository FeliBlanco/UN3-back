const { Router } = require('express');
const userModel = require('../schemes/user');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const params = req.query

        let perPage = params.perPage?params.perPage:10, page = Math.max(0, params.page)
        let filter = params.filter?params.filter:{}
        let sort = params.sort?params.sort:{}
      
        let count = await userModel.countDocuments(filter)
        let data = await userModel.find(filter)
          .limit(perPage)
          .skip(perPage * page)
          .sort(sort)
          .exec();

        res.send({
            page,
            data,
            count,
            perPage,
            totalPage: Math.ceil(count/perPage)
        })
    }
    catch(err) {
        console.log(err)
        res.status(503).send()
    }
});

router.get("/:id",  async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userModel.findOne({_id: userId});
        res.send(user);
    } 
    catch(error) {
        console.log(error);
        res.status(503).send(error);
    }
});

router.post("/", async (req, res) => {
    try {
        const newUser = req.body;
        console.log(newUser);
        const user = await new userModel(newUser).save();
        res.status(201).send(user);
    }
    catch(error) {
        console.log(error);
        res.status(503).send(error);
    }
});

router.put("/:id",  async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = req.body;
        const user = await userModel.findByIdAndUpdate(userId, updatedUser, { new: true }).exec();
        res.send(user);
    }
    catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        await userModel.findOneAndDelete({ _id: userId }).exec();
        res.send();
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;