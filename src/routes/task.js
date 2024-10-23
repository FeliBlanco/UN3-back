const { Router } = require('express');
const taskModel = require('../schemes/tasks');

const router = Router();

router.get('/', async (req, res) => {
    try {

        const params = JSON.parse(req.headers["params"]);
        let perPage = params.perPage?params.perPage:10, page = Math.max(0, params.page)
        let filter = params.filter?params.filter:{}
        let sort = params.sort?params.sort:{}
      
        let count = await taskModel.countDocuments(filter)
        let data = await taskModel.find(filter)
          .limit(perPage)
          .skip(perPage * page)
          .sort(sort)
          .populate('user')
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
        res.status(503).send(err)
    }
})

router.post('/', async (req, res) => {
    try {
        const newUserData = req.body;

        const result = await new taskModel(newUserData).save()
        res.send(result)
    }
    catch(err) {
        console.log(err)
        res.status(503).send(err)
    }
})

router.put('/:id',  async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = req.body;
        const user = await taskModel.findByIdAndUpdate(userId, updatedUser, { new: true }).exec();
        res.send(user);
  
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        await taskModel.findOneAndDelete({ _id: userId }).exec();
        res.send();
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;