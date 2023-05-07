const BASE_PREFIX = 'http://127.0.0.1:8000'

const ApiConstants = {
    LOGIN: `${BASE_PREFIX}/auth/login`,
    LOGOUT: `${BASE_PREFIX}/auth/login/logout`,
    REFRESH_TOKEN: `${BASE_PREFIX}/auth/login/refresh-token`,
    AUTH: `${BASE_PREFIX}/auth/me`,

    // đạt test
    LOGIN_: `${BASE_PREFIX}/api/v1/login`,
    CREATE_CATEGORY: `${BASE_PREFIX}/api/v1/categories?limit=1000&page=1&column=id&sort=DESc&s=`,
}

export default ApiConstants

export { BASE_PREFIX }
