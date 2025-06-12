import {Schedule, Session} from '../models/Schedule';
import {Speaker} from '../models/Speaker';
import {formatDate, formatTime} from '../util/date';

// Helper function to create speaker-sessions mapping
export const createSpeakerSessionsMap = (
  speakers: Speaker[],
  sessions: Session[],
): {[key: string]: Session[]} => {
  const speakerSessions: {[key: string]: Session[]} = {};

  speakers.forEach(speaker => {
    speakerSessions[speaker.name] = sessions.filter(session =>
      session.speakerNames.includes(speaker.name),
    );
  });

  return speakerSessions;
};

// Group sessions by date and time
export const groupSessions = (sessions: Session[]): Schedule[] => {
  const schedules: {[date: string]: {[time: string]: Session[]}} = {};

  sessions.forEach(session => {
    const date = formatDate(session.timeStart);
    const time = formatTime(session.timeStart);

    if (!schedules[date]) {
      schedules[date] = {};
    }
    if (!schedules[date][time]) {
      schedules[date][time] = [];
    }
    schedules[date][time].push(session);
  });

  return Object.entries(schedules).map(([date, timeGroups]) => ({
    date,
    groups: Object.entries(timeGroups).map(([time, sessions]) => ({
      time,
      sessions,
    })),
  }));
};
