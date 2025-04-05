interface Position {
    lat: number;
    lon: number;
    date: string;
}

interface StateHistory {
    name: string;
    color: string;
    date: string;
}

interface EquipmentType {
    id: string;
    name: string;
    model: string;
    productivity?: number;
    revenue?: number;
    state?: { name: string; color: string };
    positionHistory: Position[];
    stateHistory: StateHistory[];
}

interface EquipmentSidebarProps {
    equipment: EquipmentType;
    onClose: () => void;
}

export default EquipmentSidebarProps;