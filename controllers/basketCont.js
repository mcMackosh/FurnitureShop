const { Basket, Furniture, Comment } = require('../modelsDB/modelsDB')
const ApiError = require('../errorProcess/ApiError')
const fs = require('fs')

class BasketControler {
    async getAll(req, res, next) {
        try {
            const { userId } = req.query
            const basket = await Basket.findAll({ where: { userId: userId, status: 'IN BASKET' }, include: [{ model: Furniture, as: 'furniture' }] })
            const history = await Basket.findAll({ where: { userId: userId, status: 'IN PROCESS' }, include: [{ model: Furniture, as: 'furniture' }] })

            const response = {basket: basket, history: history}
            return res.json(response)
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }

    }

    async create(req, res, next) {
        try {
            const { userId, furnitureId } = req.body
            
            const basket = await Basket.create({ userId, furnitureId, status: "IN BASKET" })
            return res.json({ basket })
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }

    }

    async update(req, res, next) {

        try {
            let { userId, basket } = req.body
            console.log(userId, basket)
            const data = await Basket.update({ ...basket, status: 'IN PROCESS' }, { where: { id: basket.id } })
            const basketResponse = await Basket.findAll({ where: { userId: userId, status: 'IN BASKET' }, include: [{ model: Furniture, as: 'furniture' }] })
            const historyResponse = await Basket.findAll({ where: { userId: userId, status: 'IN PROCESS' }, include: [{ model: Furniture, as: 'furniture' }] })
            const response = {basket: basketResponse, history: historyResponse}
            // console.log(response)
            return res.json(response)
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }

    }

    async delete(req, res, next) {

        try {
            let {userId,basketId} = req.query
            console.log(userId)
            const data = await Basket.destroy({ where: { id: basketId} })
            const basketResponse = await Basket.findAll({ where: { userId: userId, status: 'IN BASKET' }, include: [{ model: Furniture, as: 'furniture' }] })
            const historyResponse = await Basket.findAll({ where: { userId: userId, status: 'IN PROCESS' }, include: [{ model: Furniture, as: 'furniture' }] })
            const response = {basket: basketResponse, history: historyResponse}
            return res.json(response)
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }

    }
}



module.exports = new BasketControler()