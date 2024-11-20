import { useState } from 'react';
import { corebillApi } from '../api';
import { handleApiError } from '../utils';
import { AxiosError } from 'axios';

export const useCorebill = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createOrder = async (orderData) => {
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

  const processPayment = async (paymentData) => {
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
