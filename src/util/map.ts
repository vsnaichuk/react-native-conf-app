import {Location} from '../models/Location';

// Calculate initial region to show all locations
export const getInitialRegion = (locations?: Location[]) => {
  if (!locations?.length) {
    // Fallback to Madison if no locations
    return {
      latitude: 43.0747,
      longitude: -89.3841,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    };
  }

  const minLat = Math.min(...locations.map(loc => loc.lat));
  const maxLat = Math.max(...locations.map(loc => loc.lat));
  const minLng = Math.min(...locations.map(loc => loc.lng));
  const maxLng = Math.max(...locations.map(loc => loc.lng));

  const latitude = (minLat + maxLat) / 2;
  const longitude = (minLng + maxLng) / 2;
  let latitudeDelta = (maxLat - minLat) * 1.1; // 10% padding
  let longitudeDelta = (maxLng - minLng) * 1.1;

  // Ensure minimum delta for single or close locations
  latitudeDelta = Math.max(latitudeDelta, 0.05);
  longitudeDelta = Math.max(longitudeDelta, 0.05);

  return {latitude, longitude, latitudeDelta, longitudeDelta};
};
