import React, { useEffect, useRef } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import DriftMarker from 'leaflet-drift-marker';
import 'leaflet/dist/leaflet.css';
import 'leaflet-rotatedmarker';

const hospital = [25.2048, 55.2708];
const accident = [25.2100, 55.2800];
const steps = 100;

const interpolate = (from, to, factor) =>
  from.map((v, i) => v + factor * (to[i] - v));

const generateRoutePoints = (start, end, steps) => {
  return Array.from({ length: steps + 1 }, (_, i) =>
    interpolate(start, end, i / steps)
  );
};

const getBearing = (from, to) => {
  const [lat1, lon1] = from.map((v) => (v * Math.PI) / 180);
  const [lat2, lon2] = to.map((v) => (v * Math.PI) / 180);
  const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
  const angle = (Math.atan2(y, x) * 180) / Math.PI;
  return (angle + 360) % 360;
};

const ambulanceIcon = new L.Icon({
  iconUrl: '/images/ambulance.png',
  iconSize: [48, 48],
  iconAnchor: [24, 44],
});

const hospitalIcon = new L.Icon({
  iconUrl: '/images/hospital.png',
  iconSize: [30, 30],
  iconAnchor: [15, 26],
});

const accidentIcon = new L.Icon({
  iconUrl: '/images/accident.png',
  iconSize: [40, 40],
  iconAnchor: [20, 36],
});

const AnimatedMarker = ({ setStep, setProgress, audioRef }) => {
  const map = useMap();
  const markerRef = useRef(null);

  useEffect(() => {
    const latlngs = generateRoutePoints(hospital, accident, steps);

    if (!markerRef.current) {
      markerRef.current = new DriftMarker(latlngs[0], {
        icon: ambulanceIcon,
        duration: 50,
        autoStart: false,
        rotationAngle: 0,
        rotationOrigin: 'center',
      }).addTo(map);
    }

    let index = 0;
    const interval = setInterval(() => {
      if (index >= latlngs.length - 1) {
        setStep(3); // Arrived
        setProgress(100);

        if (audioRef.current) {
          audioRef.current.play().catch((err) => {
            console.warn('Autoplay blocked until user interaction:', err.message);
          });
        }

        if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
        clearInterval(interval);
        return;
      }

      const from = latlngs[index];
      const to = latlngs[index + 1];

      markerRef.current.setLatLng(to);
      const bearing = getBearing(from, to);
      markerRef.current.setRotationAngle(bearing - 90);

      if (index === 1) setStep(1); // Left Hospital
      if (index === Math.floor(steps / 2)) setStep(2); // En Route
      setProgress(((index + 1) / steps) * 100);

      index++;
    }, 50);

    return () => clearInterval(interval);
  }, [map, setStep, setProgress, audioRef]);

  return null;
};

const MapComponent = ({ setStep, setProgress, audioRef }) => {
  return (
    <MapContainer
      center={hospital}
      zoom={15}
      style={{ height: '100%', flexGrow: 1 }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={hospital} icon={hospitalIcon}>
        <Popup>🏥 Hospital</Popup>
      </Marker>

      <Marker position={accident} icon={accidentIcon}>
        <Popup>💥 Accident Site</Popup>
      </Marker>

      <Polyline positions={[hospital, accident]} color="red" />

      <AnimatedMarker setStep={setStep} setProgress={setProgress} audioRef={audioRef} />
    </MapContainer>
  );
};

export default MapComponent;