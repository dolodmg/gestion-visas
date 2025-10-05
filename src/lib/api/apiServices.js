import 'server-only'
import { apiRequest } from '@/lib/apiRequest';

const BASE_URL = `${process.env.NEXT_PUBLIC_JAVA_BACKEND_URL}/api/services`;

export async function getService(idService) { 
    return await apiRequest(`${BASE_URL}/${idService}`, 'GET', null, 'application/json', false);
}

export async function getServices() { 
    return await apiRequest(`${BASE_URL}`, 'GET', null, 'application/json', false);
}
