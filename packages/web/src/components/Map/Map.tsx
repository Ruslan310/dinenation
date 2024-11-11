import React, {useEffect, useRef} from 'react';
import {Loader} from '@googlemaps/js-api-loader';
const googleApi = import.meta.env?.VITE_GOOGLE_API_KEY

interface LatLng {
  lat: number;
  lng: number;
}

interface MapComponentProps {
  apiKey: string;
  center: LatLng;
  zoom: number;
  marker: LatLng;
}

const defaultProps = {
  apiKey: googleApi,
  center: {
    lat: 34.68391548984974,
    lng: 33.0372399980012
  },
  zoom: 19,
  marker: {
    lat: 34.68391548984974,
    lng: 33.0379399980012
  }
};

const MapComponent: React.FC<MapComponentProps> = ({ apiKey, center, zoom, marker }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: apiKey,
      version: 'beta', // Используйте версию 'beta' или 'weekly' для новых возможностей
      libraries: ['marker'], // Обратите внимание на библиотеку 'marker'
    });

    loader.load().then((google) => {
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: center,
          zoom: zoom,
        });

        // Убедитесь, что google.maps.marker существует
        if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
          const markerElement = new google.maps.marker.AdvancedMarkerElement({
            position: marker,
            map: map,
            title: "Marker Title", // Дополнительно
          });

          // Привязываем маркер к карте
          markerElement.map = map;
        } else {
          console.error("AdvancedMarkerElement не доступен.");
        }
      }
    }).catch((error) => {
      console.error("Ошибка загрузки Google Maps API:", error);
    });
  }, [apiKey, center, zoom, marker]);

  return <div ref={mapRef} style={{ height: 500, width: '100%' }} />;
};

MapComponent.defaultProps = defaultProps;

export default MapComponent;
