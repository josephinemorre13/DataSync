import axios from "axios";

const API_KEY = process.env.HASC_API_KEY;

export async function getTrainingHistory(startDate: string, endDate: string): Promise<any> {
    if (!startDate || !endDate) {
        console.error("Error: Both startDate and endDate are requested.");
        throw new Error("Both startDate and endDate must be provided.")
    }

    const url = "https://www.hacsc.com/API/DataBatch/TrainingHistory/GetHistory";

    try {
        const response = await axios.post(
            url,
            { StartDate: startDate, EndDate: endDate },
            {
                headers: {
                    "X-ApiKey": API_KEY,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch training history", error.message);
        throw error;
    }
}