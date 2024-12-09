import { useState } from 'react';
import { corebillApi } from '../api';
import { handleApiError } from '../utils';
import { AxiosError } from 'axios';

interface OrderData {
  // Add the properties that your order data should have
  [key: string]: any; // This is a temporary solution, replace with actual properties
}

interface PaymentData {
  // Add the properties that your payment data should have
  [key: string]: any; // This is a temporary solution, replace with actual properties
}

export function useCorebill() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createOrder = async (orderData: OrderData) => {
    setLoading(true);
    try {
      const response = await corebillApi.orders.create(orderData);
      return response.data;
    } catch (err) {
      const processedError = handleApiError(err as AxiosError);
      setError(processedError);
      throw processedError;
    } finally {
      setLoading(false);
    }
  };

  const processPayment = async (paymentData: PaymentData) => {
    setLoading(true);
    try {
      const response = await corebillApi.payments.create(paymentData);
      return response.data;
    } catch (err) {
      const processedError = handleApiError(err as AxiosError);
      setError(processedError);
      throw processedError;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createOrder,
    processPayment,
    api: corebillApi
  };
};
