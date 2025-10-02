import 'server-only'
import { apiRequest } from '@/lib/apiRequest';

const BASE_URL = 'http://localhost:8080/api/contact';

export async function sendContactEmail(contact) { 
    return await apiRequest(`${BASE_URL}`, 'POST', contact, 'application/json', false);
}
