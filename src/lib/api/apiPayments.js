import 'server-only'
import { apiRequest } from '@/lib/apiRequest';

const BASE_URL = `${process.env.JAVA_BACKEND_URL}/api/mercadopago`;
console.log('🔍 JAVA_BACKEND_URL:', process.env.JAVA_BACKEND_URL);
console.log('🔍 BASE_URL completa:', BASE_URL);

export async function verifyPayment(paymentId) { 
    return await apiRequest(`${BASE_URL}/verify?paymentId=${paymentId}`, 'GET', null, 'application/json', false);
}
