export interface RosterRecord {
    lastName: string,
    firstName: string,
    councilId: string,
    email: string,
    companyEmployeeId: string
}

export interface AddTraineeRequest {
    ssn: string,
    issuingAuthority: "US"| ["CA",""],
    councilId: string,
    firstName: string,
    lastName: string,
    companyEmployeeId: string,
    phone: string,
    email: string,
    status: "FullTime" | "PartTime" | ""
}

export interface AddTraineeResponse {
    lastName: string,
    firstName: string,
    councilId: string,
    message: string
}

export interface RemoveTraineeRequest {
    ssn: string,
    issuingAuthority: "US"| ["CA",""],
    councilId: string,
    companyEmployeeId: string,
}