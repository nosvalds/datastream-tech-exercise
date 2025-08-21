import type { Actions } from './$types';

export const actions = {
    upload: async ({ request }) => {
        // TODO process csv

        return { success: true, filename: "File1.csv", monitoringLocationIds: ["WS", "IBS"] }
    },
    calculate: async ({ request }) => {
        // TODO calculate average water temp for monitoring location

        return { success: true, monitoringLocationId: "WS", averageWaterTemp: 25.5 }
    },
} satisfies Actions;