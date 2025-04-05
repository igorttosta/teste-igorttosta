import { useEnrichedEquipmentData } from "../hooks/useEnrichedEquipmentData";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";
import EquipmentSidebar from "./EquipmentSidebar";

const EquipmentMap = () => {
    const { data } = useEnrichedEquipmentData();
    const [selectedEquipment, setSelectedEquipment] = useState(null);

    const iconMapping = {
        "a3540227-2f0e-4362-9517-92f41dabbfdf": "/icons/caminhao.png",
        "a4b0c114-acd8-4151-9449-7d12ab9bf40f": "/icons/escavadora.png",
        "9c3d009e-0d42-4a6e-9036-193e9bca3199": "/icons/garra.png",
        "default": "/icons/pin.png"
    };

    return (
        <div style={{ display: "flex", position: "relative" }}>
            <MapContainer
                center={[-19.126536, -45.947756]}
                zoom={13}
                style={{ height: "500px", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {data.map((equipment) => {
                    if (!equipment.position) return null;

                    const equipmentIcon = new L.Icon({
                        iconUrl: iconMapping[equipment.equipmentModelId] || iconMapping["default"],
                        iconSize: [32, 32],
                        iconAnchor: [16, 32],
                        popupAnchor: [0, -32]
                    });

                    return (
                        <Marker
                            key={equipment.id}
                            position={[equipment.position.lat, equipment.position.lon]}
                            icon={equipmentIcon}
                            eventHandlers={{
                                click: () => {
                                    setSelectedEquipment(equipment);
                                },
                                mouseover: (e) => e.target.openPopup(),
                                mouseout: (e) => e.target.closePopup(),
                            }}
                        >
                            <Popup>
                                <strong>{equipment.name}</strong> <br />
                                Modelo: {equipment.model} <br />
                                Estado: <span style={{ color: equipment.state?.color }}>{equipment.state?.name}</span><br />
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>

            {selectedEquipment && (
                <EquipmentSidebar
                    equipment={selectedEquipment}
                    onClose={() => setSelectedEquipment(null)}
                />
            )}
        </div>
    );
};

export default EquipmentMap;