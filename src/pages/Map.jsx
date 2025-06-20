import { useEffect, useContext, useState } from "react";
import { Navbar } from "../components";
import { GoogleMap, Marker, useJsApiLoader, useLoadScript } from "@react-google-maps/api";
import { getPoints, postPoint } from '../services/mapService';
import { useAuth } from "../contexts/AuthContext";


const containerStyle = {
  width: "100%",
  height: "100%",
};

export const Map = () => {
  const { token } = useAuth();
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState({ lat: -27.1007, lng: -52.6152 }); // valor padrão
  
  // Substitua pela sua chave da API do Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    async function fetchMarkers() {
      try {
        const data = await getPoints(token);
        setMarkers(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchMarkers();
  }, [token]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
        }
      );
    }
  }, []);

  // Função para adicionar ponto ao clicar no mapa
  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const newPoint = {
      latitude: lat,
      longitude: lng,
      descricao: "Descrição do ponto", // Você pode personalizar isso
    };
    try {
      const savedPoint = await postPoint(token, newPoint);
      
      // savedPoint vem com os campos id, latitude, longitude e descricao
      // Precisamos transformar em um objeto com os campos id, title, position
      const savedMarker = {
        id: savedPoint.id,
        title: savedPoint.descricao || "Novo Ponto",
        position: {
          lat: savedPoint.latitude,
          lng: savedPoint.longitude,
        },
      };
      setMarkers((prev) => [...prev, savedMarker]);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ width: "100%", height: "100%" }}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onClick={handleMapClick}
          >
            {markers.map(marker => (
              <Marker
                key={marker.id}
                position={marker.position}
                title={marker.title}
              />
            ))}
          </GoogleMap>
        ) : (
          <div>Carregando mapa...</div>
        )}
      </div>
    </>
  );
};
