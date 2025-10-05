import 'server-only'
import { apiRequest } from '@/lib/apiRequest';

const BASE_URL = `${process.env.JAVA_BACKEND_URL}/api/coupons`;

export async function getCouponByCode(couponCode) { 
    return await apiRequest(`${BASE_URL}/code/${couponCode}`, 'GET', null, 'application/json', false);
}

export async function getCoupons() { 
    return await apiRequest(`${BASE_URL}`, 'GET', null, 'application/json', false);
}

