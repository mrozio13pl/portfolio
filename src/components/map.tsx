import Map, { Marker, type MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useRef } from 'react';
import { LngLat } from 'maplibre-gl';

const mapStyleURL = "https://tiles.openfreemap.org/styles/dark";

const target = new LngLat(19.9160931, 49.5730616);

export function LocationMap() {
    const mapRef = useRef<MapRef>(null);

    function animate() {
        mapRef.current?.flyTo({
          center: target,
          zoom: 12,
          speed: 1,
          curve: .82,
          essential: true
        })
    }

    return (
        <Map
            ref={mapRef}
            onLoad={animate}
            initialViewState={{
                zoom: 0,
                longitude: 12.4488252,
                latitude: 45.9239674,
            }}
            mapStyle={mapStyleURL}
            attributionControl={false}
        >
            <Marker longitude={target.lng} latitude={target.lat} anchor="center">
                <div className="size-3 rounded-full border-4 border-cyan-6 op-75" />
            </Marker>
        </Map>
    );
}