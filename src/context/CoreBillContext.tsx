'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react'

interface CoreBillContextType {
  token: string | null
  setToken: (token: string | null) => void
  isAuthenticated: boolean
}

const CoreBillContext = createContext<CoreBillContextType>({
  token: null,
  setToken: () => {},
  isAuthenticated: false
})

export function CoreBillProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)

  const isAuthenticated = !!token

  return (
    <CoreBillContext.Provider value={{ token, setToken, isAuthenticated }}>
      {children}
    </CoreBillContext.Provider>
  )
}

export function useCoreBill() {
  return useContext(CoreBillContext)
}
