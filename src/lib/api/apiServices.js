import 'server-only'
import { apiRequest } from '@/lib/apiRequest';

const BASE_URL = 'http://localhost:8080/api/services';

export async function getService(idService) { 
    return await apiRequest(`${BASE_URL}/${idService}`, 'GET', null, 'application/json', false);
}

export async function getServices() { 
    return await apiRequest(`${BASE_URL}`, 'GET', null, 'application/json', false);
}
