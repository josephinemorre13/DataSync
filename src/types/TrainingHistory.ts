export interface TrainingHistoryRecord {
    PurchaseOrder: string,
    CourseCode: string,
    CourseDescription: string,
    TraineeId: string,
    CompletedDate: string,
    ExpiryDate: string,
    Score: number,
    Status: "Pass" | "Fail",
    FirstName: string,
    LastName: string,
    DateOfBirth: string
}