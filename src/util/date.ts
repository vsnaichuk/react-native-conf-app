import {format} from 'date-fns';

// Helper function to convert UTC ISO string to local time (e.g., "09:00 AM")
export const formatTime = (isoString: string): string => {
  return format(new Date(isoString), 'hh:mm aa');
};

// Helper function to extract date in YYYY-MM-DD format
export const formatDate = (isoString: string): string => {
  return format(new Date(isoString), 'yyyy-MM-dd');
};
