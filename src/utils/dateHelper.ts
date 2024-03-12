import ErrorResponse from "./ErrorResponse";

export const getCurrentDateAndTime = () => {
    // Get the current timestamp
    const timestamp = Date.now();

    // Create a new Date object using the timestamp
    const currentDate = new Date(timestamp);

    // Format the date to display in a specific format (e.g., YYYY-MM-DD HH:MM:SS)
    const formattedDateTime = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;

    return formattedDateTime

}

export const addYearsToCurrentYear = (numberOfYears: number | null) => {
    if (!numberOfYears) throw new ErrorResponse("numberOfYears required to calculate years from now!", 400)
    const today = new Date();
    const futureYear = today.setFullYear(today.getFullYear() + numberOfYears);
    return futureYear
}