import 'server-only'
import { apiRequest } from '@/lib/apiRequest';

const BASE_URL = 'http://localhost:8080/api/orders';

export async function getOrder(idOrder) { 
    return await apiRequest(`${BASE_URL}/${idOrder}`, 'GET', null, 'application/json', false);
}

export async function createOrder(order) { // Crea una nueva orden
    return await apiRequest(`${BASE_URL}`, 'POST', order, 'application/json', false);
}