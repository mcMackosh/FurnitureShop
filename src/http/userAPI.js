import { $authHost,$host, $football } from "./index";
import jwt_decode from "jwt-decode"

export const registration = async (email,login,password) =>
{
    const {data} = await $host.post('api/user/registration', {email,login,password,role: 'USER'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async(email, password) =>
{
    const {data}  = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const getVerificationUser = async() =>
{
    const {data}  = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async() =>
{
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const getOneUser = async(id) =>
{
    const {data} = await $host.get('api/user/oneUser')
    console.log(data)
    return jwt_decode(data.token)
}




