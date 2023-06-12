import {$authHost, $host} from "./index";


export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}
export const updateCategory = async (category) => {
    const {data} = await $authHost.put('api/type',category)
    return data
}


export const deleteTypes = async (id) => {
    const {data} = await $authHost.delete('api/type/?id='+id)
    return data
}

export const createProducer = async (producer) => {
    const {data} = await $authHost.post('api/producer', producer)
    return data
}


export const fetchProducers = async () => {
    const {data} = await $host.get('api/producer')
    return data
}
export const deleteProducer = async (id) => {
    const {data} = await $authHost.delete('api/producer/?id='+id)
    return data
}

export const createFurniture = async (furniture) => {
   
    const {data} = await $authHost.post('api/furniture/createFurniture', furniture)
    return data
}

export const updateFurniture = async (furniture) => {
    
    const {data} = await $authHost.put('api/furniture/updateFurniture', furniture)
    
    return data
}


export const fetchFurnitures = async (req) => {
    const {data} = await $host.get(req)
    return data
}

export const deleteFurniture = async (id) => {
    const {data} = await $authHost.delete('api/furniture/deleteFurniture/?id=' + id)
    return data
}

export const fetchOneFurniture = async (id) => {
    const {data} = await $host.get('api/furniture/getOneFurniture/' + id)
    return data
}

export const fetchOneType = async (id) => {
    const {data} = await $host.get('api/type/' + id)
    return data
}

export const fetchOneProducer = async (id) => {
    const {data} = await $host.get('api/producer/' + id)
    return data
}

export const fetchAllComment = async (id) => {
    const {data} = await $host.get('api/furniture/getComment/?id='+ id)
    return data
}

export const createComment = async (comment) => {
    const {data} = await $authHost.post('api/furniture/createComment', comment)
    return data
}

export const deleteComment = async (id) => {
    
    const {data} = await $authHost.delete('api/furniture/deleteComment/?id='+ id)
    
    return data
}

export const createBasket = async (queary) => {
    const {data} = await $authHost.post('api/basket/createNewOrder', queary)
    return data
}

export const fetchAllBasket = async (userId) => {
    const {data} = await $authHost.get('api/basket/getAllOrders/?userId='+ userId)
    return data
}

export const updateOrder = async (userId,basket) => {
    console.log({userId,basket})
    const {data} = await $authHost.put('api/basket/updateOrder', {userId,basket})
    return data
}
export const deleteOrder = async (userId, basketId) => {
    const {data} = await $authHost.delete('api/basket/deleteOrder?userId='+ userId +'&basketId=' + basketId)
    return data
}