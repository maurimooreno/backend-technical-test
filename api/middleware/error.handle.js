function errorHandle(err, req, res, next) {
    if (!err.isBoom) {
        res.status(500).json({
            message: err.message,
            stack: err.stack
        })
    } else {
        next(err)
    }

}

function boomErrorHandle(err, req, res, next) {
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload)
    }
}

module.exports = {
    errorHandle,
    boomErrorHandle
}