export interface TrainingHistoryRecord {
    purchaseOrder: string,
    courseCode: string,
    courseDescription: string,
    traineeId: string,
    completedDate: string,
    expiryDate: string,
    score: number,
    status: "Pass" | "Fail",
    firstName: string,
    lastName: string,
    dateOfBirth: string
}