import 'server-only'
import { apiRequest } from '@/lib/apiRequest';

const BASE_URL = `${process.env.JAVA_BACKEND_URL}/api/contact`;

export async function sendContactEmail(contact) { 
    return await apiRequest(`${BASE_URL}`, 'POST', contact, 'application/json', false);
}
