import { Schedule, Session } from '../models/Schedule';
// import { Speaker } from '../models/Speaker';
// import { Location } from '../models/Location';
import { StorageService } from '../services/StorageService';
import data from './data.json';
import locations from './locations.json';

// const dataUrl = './data.json';
// const locationsUrl = './locations.json';

const HAS_LOGGED_IN = 'hasLoggedIn';
const HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
const USERNAME = 'username';

export const getConfData = async () => {
  const schedule = data.schedule[0];
  const sessions = parseSessions(schedule);
  const speakers = data.speakers;
  const allTracks = sessions
    .reduce((all, session) => all.concat(session.tracks), [] as string[])
    .filter((trackName, index, array) => array.indexOf(trackName) === index)
    .sort();

  const result = {
    schedule,
    sessions,
    locations,
    speakers,
    allTracks,
    filteredTracks: [...allTracks],
  };
  return result;
};

export const getUserData = async () => {
  const response = await Promise.all([
    StorageService.get({key: HAS_LOGGED_IN}),
    StorageService.get({key: HAS_SEEN_TUTORIAL}),
    StorageService.get({key: USERNAME}),
  ]);
  const isLoggedin = (await response[0].value) === 'true';
  const hasSeenTutorial = (await response[1].value) === 'true';
  const username = (await response[2].value) || undefined;
  const data = {
    isLoggedin,
    hasSeenTutorial,
    username,
  };
  return data;
};

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  await StorageService.set({
    key: HAS_LOGGED_IN,
    value: JSON.stringify(isLoggedIn),
  });
};

export const setHasSeenTutorialData = async (hasSeenTutorial: boolean) => {
  await StorageService.set({
    key: HAS_SEEN_TUTORIAL,
    value: JSON.stringify(hasSeenTutorial),
  });
};

export const setUsernameData = async (username?: string) => {
  if (!username) {
    await StorageService.remove({key: USERNAME});
  } else {
    await StorageService.set({key: USERNAME, value: username});
  }
};

function parseSessions(schedule: Schedule) {
  const sessions: Session[] = [];
  schedule.groups.forEach(g => {
    g.sessions.forEach(s => sessions.push(s));
  });
  return sessions;
}
