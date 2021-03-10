const Person = require('../models/Person');

const Persons = async (req, res) => {
    const {qq, phone, shop_type} = req.query;
    let person_exec = Person.find();
    // 搜索qq
    if (qq) person_exec = person_exec.find({
        $or: [
            {qq}, {spare_qq: qq}
        ]
    })
    // 搜索手机
    if (phone) person_exec = person_exec.find({phone});
    // 搜索店铺
    if (shop_type) person_exec = person_exec.find({shop_type});
    const persons = await person_exec.sort('-pig_create_time').limit(50).exec();
    res.send({
        code: 0,
        message: persons
    })
}

module.exports = Persons;