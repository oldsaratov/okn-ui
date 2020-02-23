import axios from 'axios';

import { authService } from '../services/auth.service';

export default axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Authorization': `Bearer ${authService.getAccessToken()}`
    }
});
