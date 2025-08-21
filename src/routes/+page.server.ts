import type { Actions } from './$types';

export const actions = {
    upload: async ({ request }) => {
        const data = await request.formData();
        const file = data.get("dataset");

        // validation
        if (!file || !(file instanceof Blob)) {
            return { success: false, error: "No file uploaded or file type invalid" };
        }
        // get request body to text for manipulation
        const arrayBuffer = await file.arrayBuffer();
        const text = new TextDecoder().decode(arrayBuffer);

        // create array of lines and skip header line and end newline
        const textArray = text.split("\n").slice(1, -1); 

        // get list of monitoring location ids to return
        const monitoringLocationIds = new Set<string>();
        textArray.forEach((line) => monitoringLocationIds.add(line.split(',')[1]))
        
        return { success: true, fileName: file.name, monitoringLocationIds }
    },
    calculate: async ({ request }) => {
        // TODO calculate average water temp for monitoring location

        return { success: true, monitoringLocationId: "WS", averageWaterTemp: 25.5 }
    },
} satisfies Actions;