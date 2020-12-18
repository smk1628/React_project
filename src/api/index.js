import ajax from './ajax'
import { BASE_URL } from '../config'
export const reqLogin = data => ajax.post(`${BASE_URL}/login`, data)
export const checkUser = data => ajax.post(`${BASE_URL}/checkUser`,data)