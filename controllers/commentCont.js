const { Comment, User, Furniture, Basket } = require('../modelsDB/modelsDB')
const ApiError = require('../errorProcess/ApiError')

class CommentContoler {
    async getAll(req, res, next) {
        const { id } = req.query
        try {
            const comment = await Comment.findAll({ where: { furnitureId: id }, include: [{ model: User, as: 'user' }] })
            return res.json({ comment })
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async create(req, res, next) {
        // try {
            let { userId, furnitureId, rait, text } = req.body
            
            
            if (await Basket.count({ where: { userId, status: 'IN PROCESS', furnitureId } }) === 1) {
                await Comment.create({ userId, furnitureId, rait, text })
                const comment = await Comment.findAll({ where: { furnitureId }, include: [{ model: User, as: 'user' }] })
                rait = Math.floor(comment.reduce((total, one) => total + one.rait, 0) / comment.length)
                
                await Furniture.update({ rait: rait }, { where: { id: furnitureId } })
                return res.json({ comment })
            }
            else {
                next(ApiError.badRequest('You can create only 1 comment on this product when you get order'))
            }

        // }
        // catch (e) {
        //     next(ApiError.internal(e.message))
        // }
    }

    async delete(req, res, next) {

        try {
            const { id } = req.query
            const buffer = await Comment.findOne({ where: { id } })
            if (buffer) {
                const data = await Comment.destroy({ where: { id } })
                const furnitureId = buffer.furnitureId
                const comment = await Comment.findAll({ where: { furnitureId }, include: [{ model: User, as: 'user' }] })
                const rait = Math.floor(comment.reduce((total, one) => total + one.rait, 0) / comment.length)
               
                await Furniture.update({ rait: rait }, { where: { id: furnitureId } })
                return res.json({ comment })
            }
            else {
                next(ApiError.internal(e.message))
            }

        }
        catch (e) {
            next(ApiError.internal(e.message))
        }

    }


}

module.exports = new CommentContoler()