import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';
import { useMapBox } from '../hooks/useMapBox';


const puntoInicial = {
    lng: -99.9860,
    lat: 20.3703,
    zoom: 12.54,
}


export const MapaPages = () => {

    const { setRef, coords, nuevoMarcador$, movimientoMarcador$, agregarMarcador,actualizarPosicion } = useMapBox( puntoInicial );
    const { socket } = useContext( SocketContext )

    // Escuchar los marcadores existentes
    useEffect(() => {
      socket.on('marcadores-activos', ( marcadores ) => {
        for( const key of Object.keys(marcadores)) {
            agregarMarcador(marcadores[key], key )
        }
      })
    
    }, [ socket, agregarMarcador ])
    

    // Nuevo marcador
    useEffect(() => {
        nuevoMarcador$.subscribe( marcador => {
            socket.emit('marcador-nuevo', marcador )
        });
    }, [nuevoMarcador$, socket]);

    // Movimiento de Marcador
    useEffect(() => {
        movimientoMarcador$.subscribe( marcador => {
            socket.emit('marcador-actualizado', marcador)
        });
    }, [socket,movimientoMarcador$]);

    //  mover marcador mediante sockets
    useEffect(() => {
        socket.on('marcador-actualizado', (marcador) => {
            actualizarPosicion( marcador)
        })
    }, [socket, actualizarPosicion])
    
    // Escuchar nuevos marcadores
    useEffect(() => {

        socket.on('marcador-nuevo', ( marcador ) => {
           agregarMarcador( marcador, id )
        })

    }, [socket, agregarMarcador])


    return (
        <>

            <div className="info">
                Lng: { coords.lng } | lat: { coords.lat } | zoom: { coords.zoom }
            </div>
            
            <div 
                ref={ setRef }
                className="mapContainer"
            />

            

        </>
    )
}