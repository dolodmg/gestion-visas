import 'server-only'
import { apiRequest } from '@/lib/apiRequest';

const BASE_URL = `${process.env.JAVA_BACKEND_URL}/api/currency`;

export async function convertUsdToArs(amount) { 
    return await apiRequest(`${BASE_URL}/usd-to-ars?amount=${amount}`, 'GET', null, 'application/json', false);
}
