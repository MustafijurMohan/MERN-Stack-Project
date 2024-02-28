
const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 400
    const message = err.message || 'Back End Error'
    const extraDetails = err.extraDetails || 'Error from Backend'

    return res.status(status).json({message, extraDetails})

}

module.exports = errorMiddleware