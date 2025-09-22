'use server'
import { getOrder, createOrder } from "@/lib/api/apiOrders"

export async function getOrderAction(idOrder) {
    const { data } = await getOrder(idOrder);
    return data;
}

export async function createOrderAction(order) {
    const { data } = await createOrder(order);
    return data;
}