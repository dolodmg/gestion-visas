'use server'
import { getOrder, createOrder, updateOrder } from "@/lib/api/apiOrders"

export async function getOrderAction(idOrder) {
    const { data } = await getOrder(idOrder);
    return data;
}

export async function createOrderAction(order) {
    const { data } = await createOrder(order);
    return data;
}

export async function updateOrderAction(idOrder, order) {
    const { data } = await updateOrder(idOrder, order);
    return data;
}