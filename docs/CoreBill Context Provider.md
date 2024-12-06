// src/context/CoreBillContext.tsx
'use client'

import React, { createContext, useContext, useReducer } from 'react';

interface CoreBillState {
  cart: CartItem[];
  orderStatus: OrderStatus | null;
  loading: boolean;
  error: string | null;
}

interface CartItem {
  id: string;
  quantity: number;
  price: number;
  title: string;
}

interface OrderStatus {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  total: number;
}

type CoreBillAction = 
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'SET_ORDER_STATUS'; payload: OrderStatus }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_CART' };

const initialState: CoreBillState = {
  cart: [],
  orderStatus: null,
  loading: false,
  error: null
};

const CoreBillContext = createContext<{
  state: CoreBillState;
  dispatch: React.Dispatch<CoreBillAction>;
} | undefined>(undefined);

function coreBillReducer(state: CoreBillState, action: CoreBillAction): CoreBillState {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, action.payload]
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'SET_ORDER_STATUS':
      return {
        ...state,
        orderStatus: action.payload
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      };

    default:
      return state;
  }
}

export function CoreBillProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(coreBillReducer, initialState);

  return (
    <CoreBillContext.Provider value={{ state, dispatch }}>
      {children}
    </CoreBillContext.Provider>
  );
}

export function useCoreBill() {
  const context = useContext(CoreBillContext);
  if (!context) {
    throw new Error('useCoreBill must be used within a CoreBillProvider');
  }
  return context;
}