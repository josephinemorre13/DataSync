export interface CourseRecord {
    courseCode: string;
    courseName: string;
}

export interface CreateRegistrationRequest {
    courseCode: string;
    employeeId: string;
    firstName: string;
    lastName: string;
    location: string;
    desiredDate: Date;
    poNumber: string;
    pfi: "Stop" | "Retry" | "Continue";
}

export interface CreateRegistrationResponse {
    isSuccessful: boolean;
    errorMessage: string;
    registrationId: number | null;
}

export interface RegistrationStatus {
    registrationId: number,
    status: string;
    message: string;
    pass: boolean;
}

export interface CancelRegistrationResponse {
    success: boolean;
    message: string;
}

export interface BundleRecord {
    ClientBundleId: number,
    BundleName: string;
    Courses: CourseRecord[],
    includesBasicPlus: string,
    includesSafetyEssentials: string
}

export interface BundleRegistrationRequest {
    ClientBundleId: number,
    EmployeeId: string,
    FirstName: string,
    LastName: string,
    Location: string,
    DesiredDate: Date;
    PoNumber: string;
    Pfi: "Stop" | "Retry" | "Continue";
}

export interface Schedule {
    courseCode: string,
    courseName: string,
    schedule: Date,
    registrationId: number
}

export interface BundleRegistrationResponse {
    isSuccessful: boolean,
    errorMessage: string,
    schedule: Schedule[]
}