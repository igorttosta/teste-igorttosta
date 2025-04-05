function calculateRevenue(
        stateHistory: { equipmentStateId: string; timestamp: string }[],
        stateMap: Map<string, { name: string }>,
        hourlyRates: { [stateName: string]: number }
    ): number {
        let total = 0;

        for (let i = 0; i < stateHistory.length - 1; i++) {
            const current = stateHistory[i];
            const next = stateHistory[i + 1];
        
            const state = stateMap.get(current.equipmentStateId);
            if (!state) continue;
        
            const rate = hourlyRates[state.name.toLowerCase()] ?? 0;
        
            const start = new Date(current.timestamp).getTime();
            const end = new Date(next.timestamp).getTime();
            const hours = (end - start) / (1000 * 60 * 60);

            total += rate * hours;
        }

    return total;
}

export default calculateRevenue;