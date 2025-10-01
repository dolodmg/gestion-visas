'use server'
import { verifyPayment } from "@/lib/api/apiPayments"

export async function verifyPaymentAction(paymentId) {
    const { data } = await verifyPayment(paymentId);
    return data;
}