export function logInfo(message: any) {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
}

export function logError(error: any) {
    console.log(`[ERROR] ${new Date().toISOString()} - ${error}`);
}