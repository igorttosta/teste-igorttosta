import React from "react";
import formatDateTime from '../utils/dateConverter';
import EquipmentSidebarProps from '../utils/interface';

const EquipmentSidebar: React.FC<EquipmentSidebarProps> = ({ equipment, onClose }) => {

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "350px",
                height: "100%",
                backgroundColor: "#fff",
                padding: "16px",
                boxShadow: "-2px 0 10px rgba(0,0,0,0.1)",
                overflowY: "auto",
                zIndex: 1000,
            }}
        >
            <button onClick={onClose} style={{ marginBottom: "12px" }}>Fechar</button>
            <h2>{equipment.name}</h2>
            <p><strong>Produtividade:</strong> {equipment.productivity?.toFixed(2)}%, <strong>Receita:</strong> R$ {equipment.revenue?.toFixed(2)}</p>

            <h3>Histórico de Estados:</h3>
            <ul>
            {equipment.stateHistory?.length > 0 ? (
                equipment.stateHistory.map((state, i) => (
                <li key={i}>
                    {state.name} - {formatDateTime(state.date)}
                </li>
                ))
            ) : (
                <li>Nenhum estado registrado</li>
            )}
            </ul>

            <h3>Histórico de Posições:</h3>
            <ul>
            {equipment.positionHistory?.length > 0 ? (
                equipment.positionHistory.map((pos, i) => (
                <li key={i}>
                    Hora: {formatDateTime(pos.date)}<br/>
                    Lat: {pos.lat}, Lon: {pos.lon}
                </li>
                ))
            ) : (
                <li>Nenhuma posição registrada</li>
            )}
            </ul>
        </div>
    );
};

export default EquipmentSidebar;