"use strict"

export function twinpalFetchOptionsOverride(options) {
    options.url = 'http://localhost:8080/graphql'
    const token = localStorage.getItem('Twinpal')
    if (token) options.headers.Authorization = `Bearer ${token}`
}
