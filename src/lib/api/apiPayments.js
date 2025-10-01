import 'server-only'
import { apiRequest } from '@/lib/apiRequest';

const BASE_URL = 'http://localhost:8080/api/mercadopago';

export async function verifyPayment(paymentId) { 
    return await apiRequest(`${BASE_URL}/verify?paymentId=${paymentId}`, 'GET', null, 'application/json', false);
}
