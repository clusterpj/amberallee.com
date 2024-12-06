// src/actions/corebill.ts
'use server'

import { corebillApi } from '@/lib/corebill/api'

export async function createOrderAction(orderData: OrderData) {
  try {
    const response = await corebillApi.orders.create({
      ...orderData,
      company_id: process.env.COREBILL_COMPANY_ID
    });

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Failed to create order:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

export async function processPaymentAction(paymentData: PaymentData) {
  try {
    const response = await corebillApi.payments.create({
      ...paymentData,
      company_id: process.env.COREBILL_COMPANY_ID
    });

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Failed to process payment:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

export async function getInventoryAction() {
  try {
    const response = await corebillApi.items.list({
      company_id: process.env.COREBILL_COMPANY_ID,
      type: 'special_edition'
    });

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Failed to fetch inventory:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Types
interface OrderData {
  items: Array<{
    id: string;
    quantity: number;
    price: number;
  }>;
  customer_email: string;
  shipping_address: {
    name: string;
    address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
}

interface PaymentData {
  order_id: string;
  amount: number;
  payment_method: string;
  payment_details: Record<string, any>;
}