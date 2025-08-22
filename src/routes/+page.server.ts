import type { Actions } from './$types';
import { parse } from "csv-parse/sync";

export const actions = {
    default: async ({ request }) => {
        try {
            const data = await request.formData();
            const file = data.get("dataset");
            const monitoringLocationId = data.get("location");

            // validation
            if (!file || !(file instanceof Blob)) {
                return { success: false, error: "No file uploaded or file type invalid" };
            }
            // get request body to text for manipulation
            const arrayBuffer = await file.arrayBuffer();
            const text = new TextDecoder().decode(arrayBuffer);

            // use csv parser to handle commas in fields
            const textArray: string[][] = parse(text, { skip_empty_lines: true });
            if (!textArray.length) {
                return { success: false, error: "CSV file is empty or invalid" };
            }

            // get a map of header positions so we don't hardcode index positions
            const header = textArray[0];
            const headerIndexMap = header.reduce((acc, col, index) => {
                acc[col] = index;
                return acc;
            }, {} as Record<string, number>);

            if (!headerIndexMap['MonitoringLocationID'] || !headerIndexMap['CharacteristicName'] || !headerIndexMap['ResultValue']) {
                return { success: false, error: "CSV file is missing required columns" };
            }

            // get body of csv
            const body = textArray.slice(1);

            // calculate average water temp for location
            let averageWaterTempUnit = "";
            let count = 0;
            const sumWaterTemp = body.reduce((acc, line) => {
                if ((line[headerIndexMap['MonitoringLocationID']] === monitoringLocationId) && (line[headerIndexMap['CharacteristicName']] === 'Temperature, water')) {
                    if (!averageWaterTempUnit) {
                        averageWaterTempUnit = line[headerIndexMap['ResultUnit']];
                    }
                    count = count + 1;
                    return acc + parseFloat(line[headerIndexMap['ResultValue']]);
                }
                return acc;
            }, 0);

            const averageWaterTemp = count > 0 ? Math.round((sumWaterTemp / count) * 100) / 100 : 0;

            return { success: true, fileName: file.name, monitoringLocationId, averageWaterTemp, averageWaterTempUnit }
        } catch (error) {
            console.error("Error processing file:", error);
            return { success: false, error: "Error processing file" };
        }
    },
} satisfies Actions;