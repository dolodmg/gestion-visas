'use server'
import { sendContactEmail } from "@/lib/api/apiMails";

export async function sendContactEmailAction(contact) {
    const { data } = await sendContactEmail(contact);
    return data;
}
