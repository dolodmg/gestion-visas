'use server'
import { getService, getServices } from "@/lib/api/apiServices"

export async function getServiceAction(idService) {
    const { data } = await getService(idService);
    return data;
}

export async function getServicesAction() {
    const { data } = await getServices();
    return data;
}
