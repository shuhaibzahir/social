
const{ validationResult} = require("express-validator")

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if(errors.isEmpty()){
        next()
    }
    const catchingErr = errors.array().map((err)=> {
        return {[err.param]:err.msg}
    })

    return res.status(422).json({error:catchingErr})
}

module.exports= validate