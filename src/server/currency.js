'use server'
import { convertUsdToArs } from "@/lib/api/apiCurrency";

export async function convertUsdToArsAction(amount) {
    const { data } = await convertUsdToArs(amount);
    return data;
}
