"use client";

import dynamic from "next/dynamic";
const EquipmentMap = dynamic(() => import("../components/Map"), {
    ssr: false,
});

export default function Home() {
    return (
        <>
            <h1>Teste Frontend Aiko 🚀</h1>
            <EquipmentMap />
        </>
    );
}