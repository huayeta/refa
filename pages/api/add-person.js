import Person from '../../models/Person';

export default async (req, res) => {

    const {method} = req;
    res.status(200)
    if(method === 'POST'){

        const body = req.body;
        if(!body) return res.json({
            code: -1,
            message: 'body不存在'
        })
        console.log(body);
        res.json({
            code: 0,
            message: '正常'
        })
    }else{
        res.json({
            code: -1,
            message: '请使用POST请求'
        })
    }
}