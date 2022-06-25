import axios from 'axios'

const BASE_URL = 'http://localhost:3006/'

export const getUrlMetaData = (url) => axios.get(`${BASE_URL}?link=${url}`)