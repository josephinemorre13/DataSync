import { getBundles, getCourses, getLocations } from "./api/registrationAPI";
import { getRoster, updateEmployee } from "./api/rosterManagementAPI";
import { getTrainingHistory } from "./api/trainingHistoryAPI";
import { RosterRecord } from "./types/RosterManagement";
import { TrainingHistoryRecord } from "./types/TrainingHistory";
import { cleanBundleData, cleanCoursesData, cleanRosterData, cleanTrainingHistoryData } from "./utils/dataCleaner";
import { logError, logInfo } from "./utils/logger";
import xlsx from 'xlsx';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.HASC_API_KEY;

let employees: RosterRecord[] = [];

async function syncData(): Promise<void> {
    try {
        if (!API_KEY) {
            console.error("Error: API key is empty. Please set the HASC_API_KEY environment variable.");
            throw new Error("API key is missing.")
        }
        
        logInfo("Starting data sync...");

        // const trainingData = await getTrainingHistory("1/1/2024", "12/31/2024");
        // const cleanedTrainingData: TrainingHistoryRecord[] = cleanTrainingHistoryData(trainingData);

        // logInfo("Training Data Cleaned and Ready for Sync:");
        // console.log(cleanedTrainingData);

        const rosterData = await getRoster();
        console.log("🚀 ~ syncData ~ rosterData:", rosterData)
        const cleanedRosterData: RosterRecord[] = cleanRosterData(rosterData);
        employees = cleanedRosterData;

        logInfo("Roster Management Cleaned and Ready for Sync:");
        console.log(cleanedRosterData);

        // const locations = await getLocations();

        // logInfo("Registration Locations Ready for Sync:");
        // console.log(locations);

        // const courseData = await getCourses();
        // const cleanedCourseData = cleanCoursesData(courseData);

        // logInfo("Course Data Cleaned and Ready for Sync:");
        // console.log(cleanedCourseData);

        // const bundleData = await getBundles("Pasadena");
        // const cleanedBundleData = cleanBundleData(bundleData);

        // logInfo("Bundle Data Cleaned and Ready for Sync:");
        // console.log(cleanedBundleData);

        logInfo("Data Sync Completed Successfully.");

    } catch (error: any) {
        logError(error.message);
    }
}

async function updateEmployeeData(userData: any): Promise<void> {
    try {
        
        logInfo("Starting updating employee data...");

        const updatedEmployeeData = await updateEmployee(userData);

        logInfo("Updating Employe Data Successfully.");

    } catch (error: any) {
        logError(error.message);
    }
}

function getFileData(): any[] {
    try {
        const filePath = path.join("C:", "Users", "josep", "Documents", "Upwork", "Roy_V", "userlist.xlsx");
        
        // Read the workbook
        const workbook = xlsx.readFile(filePath);
    
        // Get the first sheet name
        const sheetName = workbook.SheetNames[0];
    
        // Get the worksheet
        const worksheet = workbook.Sheets[sheetName];
    
        // Convert the worksheet to JSON format
        const data = xlsx.utils.sheet_to_json(worksheet);
    
        return data;
    } catch (error: any) {
        logError(error.message);
        throw error;
    }
}

try {
    if (!API_KEY) {
        console.error("Error: API key is empty. Please set the HASC_API_KEY environment variable.");
        throw new Error("API key is missing.")
    }

    syncData()
        .then(() => {
            const fileData: any[] = getFileData()
            fileData.forEach(userData => {
                const filteredEmployee = employees.filter(each => {
                    if (each.email && userData.mail) return each.email.toLowerCase() === userData.mail.toLowerCase()
                    return false;
                })
                if (filteredEmployee.length > 0) {
                    filteredEmployee.forEach(employeeData => {
                        const integratedEmployeeData = {
                            ...userData,
                            ...employeeData,
                        }    
                        console.log("🚀 ~ .then ~ integratedEmployeeData:", integratedEmployeeData)

                        // updateEmployeeData(userData);
                    })
                }
            });
        })
        .catch((error: any) => {
            throw error
        })
} catch (error: any) {
    logError(error.message);
}