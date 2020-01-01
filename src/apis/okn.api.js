import axios from 'axios';

import { authService } from '../services/auth.service';

export default axios.create({
    baseURL: 'https://dev.okn.oldsaratov.ru/api',
    headers: {
        'Authorization': `Bearer ${authService.getAccessToken()}`
    }
});
