export interface TimeData {
  YEAR: number;
  MONTH: number;
  DAY: number;
  WEEKDAY: number;
  HOUR: number;
  MINUTE: number;
  SECOND: number;
  NANOSECOND: number;
}

export function convertTimeData(timeData: TimeData): Date | null {
  if (timeData.YEAR === 1970 && timeData.MONTH === 1 && timeData.DAY === 1) {
    return null;
  }
  
  try {
    if (timeData.YEAR < 1900 || timeData.YEAR > 2100) {
      return null;
    }
    
    if (timeData.MONTH < 1 || timeData.MONTH > 12) {
      return null;
    }
    
    if (timeData.DAY < 1 || timeData.DAY > 31) {
      return null;
    }
    
    const date = new Date(
      timeData.YEAR,
      timeData.MONTH - 1,
      timeData.DAY,
      timeData.HOUR,
      timeData.MINUTE,
      timeData.SECOND,
      Math.floor(timeData.NANOSECOND / 1000000)
    );
    
    if (isNaN(date.getTime())) {
      return null;
    }
    
    return date;
  } catch (error) {
    return null;
  }
}

export function convertBoolean(value: number): boolean {
  return value === 1;
}

export function parseTimestamp(timestamp: string | undefined): Date | null {
  try {
    if (!timestamp) {
      return null;
    }
    
    let cleanTimestamp = timestamp;
    cleanTimestamp = cleanTimestamp.replace(/\s*\([^)]+\)/g, '');
    cleanTimestamp = cleanTimestamp.replace(/GMT\+(\d{4})/, '+$1');
    cleanTimestamp = cleanTimestamp.replace(/GMT-(\d{4})/, '-$1');
    
    const parsedTimestamp = new Date(cleanTimestamp);
    if (isNaN(parsedTimestamp.getTime())) {
      return null;
    }
    
    return parsedTimestamp;
  } catch (error) {
    return null;
  }
} 