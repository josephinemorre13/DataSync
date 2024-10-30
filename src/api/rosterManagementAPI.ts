import axios from "axios";
import { AddTraineeRequest, AddTraineeResponse, RemoveTraineeRequest } from "../types/RosterManagement";
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.HASC_API_KEY;
const BASE_URL = "https://api1.hasc.com";

export async function getRoster(): Promise<any> {
    const url = `${BASE_URL}/v1/roster`;

    try {
        const response = await axios.get(
            url,
            {
                headers: {
                    "X-ApiKey": API_KEY
                }
            }
        );

        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch roster", error.message);
        throw error;
    }
}

export async function addTrainee(request: AddTraineeRequest): Promise<AddTraineeResponse> {
    const {
        Ssn,
        IssuingAuthority,
        CouncilId,
        FirstName,
        LastName,
        Phone,
        Email,
        Status
    } = request;

    if (!Ssn && !IssuingAuthority && !CouncilId) {
        console.error("Error: Either the SSN and IssuingAuthority are requested OR the CouncilId of an existing trainee.");
        throw new Error("Either the SSN and IssuingAuthority must be provided OR the CouncilId of an existing trainee.")
    }

    if (!FirstName || !LastName || !Phone || !Email) {
        console.error("Error: FirstName, LastName, Phone and Email are requested.");
        throw new Error("FirstName, LastName, Phone and Email must be provided.")
    }

    if (!["US", ["CA", ""]].includes(IssuingAuthority)) {
        console.error("Error: Either 1 for US SSNs or 2 for Canadian SSNs.");
        throw new Error(`Either 1 for US SSNs or 2 for Canadian SSNs. ["US"|"CA",""]`) 
    }

    if (!["FullTime", "PartTime", ""].includes(Status)) {
        console.error("Error: If not empty, either FullTime or PartTime are requested.");
        throw new Error(`If not empty, either FullTime or PartTime must be provided.`) 
    }

    const url = `${BASE_URL}/v1/roster/add`;
    
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
            firstName: FirstName,
            lastName: LastName,
            councilId: CouncilId,
            message: "SUCCESS"
        }
    } catch (error: any) {
        console.error("Failed to add trainee", error.message);
        return {
            firstName: FirstName,
            lastName: LastName,
            councilId: CouncilId,
            message: `ERROR - ${error.message}`
        }
    }
}

export async function removeTrainee(request: RemoveTraineeRequest): Promise<any> {
    const { Ssn, IssuingAuthority, CouncilId } = request;

    if (!Ssn && !IssuingAuthority && !CouncilId) {
        console.error("Error: Either the SSN and IssuingAuthority are requested OR the CouncilId of an existing trainee.");
        throw new Error("Either the SSN and IssuingAuthority must be provided OR the CouncilId of an existing trainee.")
    }

    const url = `${BASE_URL}/v1/roster/remove`;
    
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

        return "SUCCESS";
    } catch (error: any) {
        console.error("Failed to remove trainee", error.message);
        return `ERROR - ${error.message}`;
    }
}

export async function updateEmployee(userData: any): Promise<any> {
    try {
        const removeEmployeeResult = await removeTrainee(userData);
        if (removeEmployeeResult === "SUCCESS") {
            const addEmployeeResult = await addTrainee(userData);
        }

        return "SUCCESS";
    } catch (error: any) {
        console.error("Failed to update employee", error.message);
        return `ERROR - ${error.message}`;
    }
}