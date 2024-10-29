import { BundleRecord, CourseRecord } from "../types/Registration";
import { AddTraineeRequest, AddTraineeResponse, RosterRecord } from "../types/RosterManagement";
import { TrainingHistoryRecord } from "../types/TrainingHistory";

/**
 * Cleans and formats training history data records.
 * @param {any[]} data - Raw training history data.
 * @returns {TrainingHistoryRecord[]} - Cleaned training history data records.
 */
export function cleanTrainingHistoryData(data: any[] ): TrainingHistoryRecord[] {
    return data.map(record => ({
        PurchaseOrder: record.PurchaseOrder,
        CourseCode: record.CourseCode,
        CourseDescription: record.CourseDescription,
        TraineeId: record.TraineeId,
        CompletedDate: record.CompletedDate,
        ExpiryDate: record.ExpiryDate,
        Score: record.Score,
        Status: record.Status,
        FirstName: record.FirstName,
        LastName: record.LastName,
        DateOfBirth: record.DateOfBirth
    }));
}

/**
 * Cleans and formats roster data records.
 * @param {any[]} data - Raw roster data.
 * @returns {RosterRecord[]} - Cleaned roster data records.
 */
export function cleanRosterData(data: any[]): RosterRecord[] {
    return data.map(record => ({
        lastName: record.lastName,
        firstName:  record.firstName,
        councilId: record.councilId,
        email: record.email,
        companyEmployeeId: record.companyEmployeeId
    }))
}

/**
 * Cleans and formats course data records.
 * @param {any[]} data - Raw course data.
 * @returns {CourseRecord[]} - Cleaned course data records.
 */
export function cleanCoursesData(data: any[]): CourseRecord[] {
    return data.map(record => ({
        courseCode: record.courseCode,
        courseName: record.courseName
    }))
}

/**
 * Cleans and formats bundle data reocrds.
 * @param {any[]} data - Raw bundle data.
 * @returns {BundleRecord[]} - Cleaned bundle data records.
 */
export function cleanBundleData(data: any[]): BundleRecord[] {
    return data.map(record => ({
        ClientBundleId: record.ClientBundleId,
        BundleName: record.BundleName,
        Courses: record.Courses,
        includesBasicPlus: record.includesBasicPlus,
        includesSafetyEssentials: record.includesSafetyEssentials
    }))
}