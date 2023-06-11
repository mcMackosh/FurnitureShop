class ApiError extends Error
{
    constructor(status, message)
    {
        super()
        this.status = status
        this.message = message

    }

    static forbidden(message)
    {
        return new ApiError(403, message)
        //У клиента нет прав доступа к содержимому, поэтому сервер отказывается дать надлежащий ответ.
    }

    static badRequest(message)
    {
        return new ApiError(400, message)
        //Этот ответ означает, что сервер не понимает запрос из-за неверного синтаксиса
    }

    static internal(message)
    {
        return new ApiError(500, message)
        //Сервер столкнулся с ситуацией, которую он не знает как обработать
    } 
}

module.exports = ApiError