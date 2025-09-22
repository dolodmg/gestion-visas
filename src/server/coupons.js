'use server'
import { getCoupons, getCouponByCode } from "@/lib/api/apiCoupons"

export async function getCouponsAction() {
    const { data } = await getCoupons();
    return data;
}

export async function getCouponByCodeAction(couponCode) {
    const { data } = await getCouponByCode(couponCode);
    return data;
}

