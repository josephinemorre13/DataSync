import axios from "axios";
import { BundleRegistrationRequest, BundleRegistrationResponse, CancelRegistrationResponse, CreateRegistrationRequest, CreateRegistrationResponse, RegistrationStatus } from "../types/Registration";
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.HASC_API_KEY;
const BASE_URL = "https://api1.hasc.com";

const statusMessages = {
    "Complete": "Course has been completed.",
    "In Progress": "Course has been started but is not yet complete.",
    "Pending": "The trainee has not started the course.",
    "No Show": "The trainee did not start the course within 5 days of the registration date or did not complete it within 5 days of start.",
    "Cancelled": "The course was canceled/deleted from the trainee."
} as const;

type status = keyof typeof statusMessages;

export async function getLocations(): Promise<string[]> {
    const url = `${BASE_URL}/v1/registration/locations`;

    try {
        const response = await axios.get(
            url,
            {
                headers: {
                    "X-ApiKey": API_KEY
                }
            }
        )

        return response.data
    } catch (error: any) {
        console.error("Failed to fetch available locations", error.message);
        throw error;
    }
};

export async function getCourses(location: string = "Pasadena"): Promise<any> {
    const url = `${BASE_URL}/v1/registration/courses`;

    try {
        const response = await axios.post(
            url,
            { location: location },
            {
                headers: {
                    "X-ApiKey": API_KEY
                }
            }
        )

        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch courses", error.message);
        throw error;
    }
}

export async function createRegistration(request: CreateRegistrationRequest): Promise<CreateRegistrationResponse> {
    let {
        courseCode,
        employeeId,
        firstName,
        lastName,
        location = "Pasadena",
        desiredDate,
        poNumber,
        pfi
    } = request;

    if (!courseCode || !employeeId || !firstName || !lastName || !location || !poNumber || !pfi) {
        console.error("Error: CourseCode, employeeId, firstName, lastName, location, poNumber and pfi are requested.");
        throw new Error("CourseCode, employeeId, firstName, lastName, location, poNumber and pfi must be provided.")
    }

    if (["Stop", "Retry", "Continue"].includes(pfi)) {
        console.error("Error: Stop, Retry and Continue are requested for PFI.");
        throw new Error(`Stop, Retry and Continue must be provided for PFI.`) 
    }

    if (new Date(desiredDate) < new Date()) {
        console.error("Error: Current date or after is requested for desiredDate.");
        throw new Error(`DesiredDate must be current date or after.`) 
    }

    if (!desiredDate) {
        let currentDate = new Date();
        currentDate.setDate(new Date().getDate() + 1);
        desiredDate = currentDate;
    }

    const url = `${BASE_URL}/v1/registration/create`;

    try {
        const response = await axios.post(
            url,
            request,
            {
                headers: {
                    "X-ApiKey": API_KEY
                }
            }
        );

        return {
            isSuccessful: true,
            errorMessage: "",
            registrationId: response.data.registrationId
        }
    } catch (error: any) {
        console.error("Failed to register employee to the course")
        return {
            isSuccessful: false,
            errorMessage: error.message,
            registrationId: null
        }
    }
}

export async function getRegistrationStatus(registrationId: number): Promise<RegistrationStatus> {
    if (!registrationId) {
        console.error("Error: RegistrationId is requested.");
        throw new Error("RegistrationId must be provided.")
    }

    const url = `${BASE_URL}/v1/registration/status`;

    try {
        const response = await axios.post(
            url,
            { registrationId: registrationId },
            {
                headers: {
                    "X-ApiKey": API_KEY
                }
            }
        );

        const status: status = response.data

        return {
            registrationId: registrationId,
            status: status,
            message: statusMessages[status] || "Not Found",
            pass: true
        }
    } catch (error: any) {
        console.error("Failed to fetch registration status", error.message);
        return {
            registrationId: registrationId,
            status: "Error",
            message: error.message,
            pass: false
        }
    }
}

export async function cancelRegistration(registrationId: number): Promise<CancelRegistrationResponse> {
    if (!registrationId) {
        console.error("Error: RegistrationId is requested.");
        throw new Error("RegistrationId must be provided.")
    }

    const url = `${BASE_URL}/v1/registration/cancel`;

    try {
        const response = await axios.post(
            url,
            { registrationId: registrationId },
            {
                headers: {
                    "X-ApiKey": API_KEY
                }
            }
        );

        return {
            success: true,
            message: ""
        }
    } catch (error: any) {
        console.error("Failed to cancel registration", error.message);
        return {
            success: false,
            message: error.message
        }
    }
}

export async function getBundles(location: string): Promise<any> {
    if (!location) {
        console.error("Error: Location is requested.");
        throw new Error("Location must be provided.")
    }

    const url = `${BASE_URL}/v1/registration/get-bundles`;

    try {
        const response = await axios.post(
            url,
            { location: location },
            {
                headers: {
                    "X-ApiKey": API_KEY
                }
            }
        )

        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch bundles", error.message);
        throw error;
    }
}

export async function registerBundle(request: BundleRegistrationRequest): Promise<BundleRegistrationResponse> {
    let {
        clientBundleId,
        employeeId,
        firstName,
        lastName,
        location = "Pasadena",
        desiredDate,
        poNumber,
        pfi
    } = request;

    if (!clientBundleId || !employeeId || !firstName || !lastName || !location || !poNumber || !pfi) {
        console.error("Error: ClientBundleId, employeeId, firstName, lastName, location, poNumber and pfi are requested.");
        throw new Error("ClientBundleId, employeeId, firstName, lastName, location, poNumber and pfi must be provided.")
    }

    if (["Stop", "Retry", "Continue"].includes(pfi)) {
        console.error("Error: Stop, Retry and Continue are requested for PFI.");
        throw new Error(`Stop, Retry and Continue must be provided for PFI.`) 
    }

    if (new Date(desiredDate) < new Date()) {
        console.error("Error: Current date or after is requested for desiredDate.");
        throw new Error(`DesiredDate must be current date or after.`) 
    }

    if (!desiredDate) {
        let currentDate = new Date();
        currentDate.setDate(new Date().getDate() + 1);
        desiredDate = currentDate;
    }

    const url = `${BASE_URL}/v1/registration/get-bundles`;

    try {
        const response = await axios.post(
            url,
            { location: location },
            {
                headers: {
                    "X-ApiKey": API_KEY
                }
            }
        )

        return {
            isSuccessful: true,
            errorMessage: "",
            schedule: response.data
        };
    } catch (error: any) {
        console.error("Failed to register bundle", error.message);
        return {
            isSuccessful: false,
            errorMessage: error.message,
            schedule: []
        };
    }
}