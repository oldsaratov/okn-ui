import axios from 'axios';

import { authService } from '../services/auth.service';

const OLDSARATOV_BASE = 'https://oldsaratov.ru';

export function getUserProfile() {
    const oldsaratov = axios.create({
        baseURL: OLDSARATOV_BASE,
        headers: { 'Authorization': `Bearer ${authService.getAccessToken()}` }
    });

    return oldsaratov.get(`/oauth2/UserInfo`)
        .then(({ data, status }) => {
            if (status >= 200 && status < 300) {
                return mapProfileDto(data);
            }
        })
        .catch((error) => Promise.reject(error));
}

function mapProfileDto(dto) {
    return {
        email: dto.email,
        name: dto.preferred_username || dto.name,
        profileUrl: dto.profile,
        avatar: dto.picture
    };
}