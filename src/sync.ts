import { getBundles, getCourses, getLocations } from "./api/registrationAPI";
import { getRoster } from "./api/rosterManagementAPI";
import { getTrainingHistory } from "./api/trainingHistoryAPI";
import { RosterRecord } from "./types/RosterManagement";
import { TrainingHistoryRecord } from "./types/TrainingHistory";
import { cleanBundleData, cleanCoursesData, cleanRosterData, cleanTrainingHistoryData } from "./utils/dataCleaner";
import { logError, logInfo } from "./utils/logger";

const API_KEY = process.env.HASC_API_KEY;

async function syncData(): Promise<void> {
    try {
        if (!API_KEY) {
            console.error("Error: API key is empty. Please set the HASC_API_KEY environment variable.");
            throw new Error("API key is missing.")
        }
        
        logInfo("Starting data sync...");

        const trainingData = await getTrainingHistory("1/1/2024", "12/31/2024");
        const cleanedTrainingData: TrainingHistoryRecord[] = cleanTrainingHistoryData(trainingData);

        logInfo("Training Data Cleaned and Ready for Sync:");
        console.log(cleanedTrainingData);

        const rosterData = await getRoster();
        const cleanedRosterData: RosterRecord[] = cleanRosterData(rosterData);

        logInfo("Roster Management Cleaned and Ready for Sync:");
        console.log(cleanedRosterData);

        const locations = await getLocations();

        logInfo("Registration Locations Ready for Sync:");
        console.log(locations);

        const courseData = await getCourses();
        const cleanedCourseData = cleanCoursesData(courseData);

        logInfo("Course Data Cleaned and Ready for Sync:");
        console.log(cleanedCourseData);

        const bundleData = await getBundles("Pasadena");
        const cleanedBundleData = cleanBundleData(bundleData);

        logInfo("Bundle Data Cleaned and Ready for Sync:");
        console.log(cleanedBundleData);

        logInfo("Data Sync Completed Successfully.");

    } catch (error: any) {
        logError(error.message);
    }
}

syncData();