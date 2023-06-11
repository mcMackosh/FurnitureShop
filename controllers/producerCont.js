const { Producer } = require('../modelsDB/modelsDB')
const ApiError = require('../errorProcess/ApiError')

class ProducerCont {
    async create(req, res, next) {

        try {
            const { name } = req.body
            const producer = await Producer.create({ name })
            res.json(producer)
        } catch (error) {
            next(ApiError.internal('Error process data:'))
        }

    }

    async getAll(req, res, next) {
        try {
            const producer = await Producer.findAll()
            res.json(producer)
        } catch (error) {
            next(ApiError.internal('Error process data:'))
        }

    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const producer = await Producer.findOne({ where: { id } })
            return res.json(producer)
        } catch (error) {
            next(ApiError.internal('Error process data:'))
        }

    }

    async delete(req, res, next) {
        try {
            const { id } = req.query
            const data = await Producer.destroy({ where: { id: id } })
            res.json(data)
        } catch (error) {
            next(ApiError.internal('Error process data:'))
        }

    }
}

module.exports = new ProducerCont()