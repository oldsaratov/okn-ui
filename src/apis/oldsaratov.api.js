import axios from 'axios';

export const OLDSARATOV_BASE = 'https://oldsaratov.ru';
export const OLDSARATOV_AUTH = `${OLDSARATOV_BASE}/oauth2/authorize`;

export const oldsaratov =  axios.create({
    baseURL: OLDSARATOV_BASE
});
