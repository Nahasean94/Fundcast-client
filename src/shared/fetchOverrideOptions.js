export function fundcastFetchOptionsOverride(options) {
    options.url = 'http://localhost:8080/graphql'
    const token = localStorage.getItem('Fundcast')
    if (token) options.headers.Authorization = `Bearer ${token}`
}
