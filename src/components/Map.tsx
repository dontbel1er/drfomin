import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const POSITION: [number, number] = [60.035, 30.26]

export function Map() {
  return (
    <div style={{ width: '100%', height: '300px', borderRadius: '5px', overflow: 'hidden', position: 'relative', zIndex: 1, isolation: 'isolate' }}>
      <MapContainer
        center={POSITION}
        zoom={15}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={POSITION}>
          <Popup>
            Family Doctor Clinic
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
