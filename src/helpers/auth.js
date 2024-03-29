import decode from 'jwt-decode'
import {logout} from "../store/actions"

export default function requestWithoutToken(url, method = 'GET', body) {
    const config = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (body) {
        config.body = JSON.stringify(body)
    }

    return fetch(url, config)
        .then(async (response) => {
            const res = await response.json()
            if (response.status >= 400 && response.status < 600) {
                if (res.error) {
                    throw res.error
                } else {
                    throw new Error('Something went wrong!!!')
                }
            }
            return res
        })
}

export const getToken = () => {
    const token = localStorage.getItem('token')
    if (!token) return Promise.resolve(null)

    if (token) {
        const parsed = JSON.parse(token)
        const decoded = decode(parsed.jwt)
        if (decoded.exp - new Date().getTime() / 1000 > 60) {
            return Promise.resolve(parsed.jwt)
        } else {
            const apiHost = process.env.REACT_APP_API_HOST
            return requestWithoutToken(`${apiHost}/user/${decoded.userId}/token`, 'PUT', {
                refreshToken: parsed.refreshToken
            })
                .then(token => {
                    saveToken(token)
                    return token.jwt
                })
                .catch(() => {
                    logout()
                })
        }
    } else {
        logout()
    }
}

export function saveToken(token) {
    localStorage.setItem('token', JSON.stringify(token))
}

export function checkLoginStatus() {
    return !!localStorage.getItem('token')
}