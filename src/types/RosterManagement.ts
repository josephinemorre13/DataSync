export interface RosterRecord {
    lastName: string,
    firstName: string,
    councilId: string,
    email: string,
    companyEmployeeId: string
}

export interface AddTraineeRequest {
    Ssn: string,
    IssuingAuthority: "US"| ["CA",""],
    CouncilId: string,
    FirstName: string,
    LastName: string,
    CompanyEmployeeId: string,
    Phone: string,
    Email: string,
    Status: "FullTime" | "PartTime" | ""
}

export interface AddTraineeResponse {
    lastName: string,
    firstName: string,
    councilId: string,
    message: string
}

export interface RemoveTraineeRequest {
    Ssn: string,
    IssuingAuthority: "US"| ["CA",""],
    CouncilId: string,
    CompanyEmployeeId: string,
}