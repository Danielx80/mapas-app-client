import React from 'react'
import { SocketProvider } from './context/SocketContext'

import { MapaPages } from './pages/MapaPages'

export const MapasApp = () => {
  return (
    <>
    <SocketProvider>
    <MapaPages />
    </SocketProvider>
    
    </>
  )
}
