// mockData/speakers.ts
import {Speaker} from '../models/Speaker';
import {Schedule, Session} from '../models/Schedule';
import {Location} from '../models/Location';
import {createSpeakerSessionsMap, groupSessions} from './dataUtil';

// Speakers

export const mockSpeakers: Speaker[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    profilePic:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    twitter: 'sarahchen_dev',
    instagram: 'sarahchen.codes',
    about:
      'Senior Frontend Engineer at TechCorp. Passionate about React Native performance optimization and mobile UX.',
    title: 'Senior Frontend Engineer',
    location: 'San Francisco, CA',
    email: 'sarah@techcorp.com',
    phone: '+1-555-0123',
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    profilePic:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    twitter: 'marcus_codes',
    instagram: 'marcus.fullstack',
    about:
      'Full-stack developer and conference organizer. 10+ years building scalable web applications.',
    title: 'Full-Stack Developer & Conference Organizer',
    location: 'Austin, TX',
    email: 'marcus@example.com',
    phone: '+1-555-0124',
  },
  {
    id: 3,
    name: 'Dr. Elena Rodriguez',
    profilePic:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    twitter: 'dr_elena_ai',
    instagram: 'elena.ai.research',
    about:
      'AI Research Scientist at Google. PhD in Computer Science from Stanford. Expert in machine learning and neural networks.',
    title: 'AI Research Scientist at Google',
    location: 'Mountain View, CA',
    email: 'elena@google.com',
    phone: '+1-555-0125',
  },
  {
    id: 4,
    name: 'Ahmed Hassan',
    profilePic:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    twitter: 'ahmed_dev',
    instagram: 'ahmed.devops',
    about:
      'DevOps Engineer specializing in Kubernetes and cloud infrastructure. AWS certified solutions architect.',
    title: 'DevOps Engineer & AWS Solutions Architect',
    location: 'Dubai, UAE',
    email: 'ahmed@cloudtech.com',
    phone: '+971-555-0126',
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    profilePic:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    twitter: 'lisa_designs',
    instagram: 'lisa.ux.dev',
    about:
      'UX Designer turned developer. Specializes in design systems and accessibility in mobile applications.',
    title: 'UX Designer & Mobile Developer',
    location: 'Toronto, ON',
    email: 'lisa@designdev.com',
    phone: '+1-555-0127',
  },
  {
    id: 6,
    name: 'Raj Patel',
    profilePic:
      'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face',
    twitter: 'raj_blockchain',
    instagram: 'raj.crypto.dev',
    about:
      'Blockchain developer and cryptocurrency enthusiast. Building the future of decentralized applications.',
    title: 'Blockchain Developer & Crypto Enthusiast',
    location: 'Mumbai, India',
    email: 'raj@blockchaintech.com',
    phone: '+91-555-0128',
  },
];

export const mockSessions: Session[] = [
  {
    id: 1,
    name: 'React Native Performance: Beyond the Basics',
    location: 'Main Hall',
    description:
      'Deep dive into advanced performance optimization techniques for React Native applications.',
    speakerNames: ['Sarah Chen'],
    timeStart: '2024-03-15T09:00:00Z',
    timeEnd: '2024-03-15T10:00:00Z',
    tracks: ['Mobile'],
  },
  {
    id: 2,
    name: 'Building Scalable APIs with Node.js',
    location: 'Room A',
    description:
      'Learn how to architect and build APIs that can handle millions of requests.',
    speakerNames: ['Marcus Johnson'],
    timeStart: '2024-03-15T10:30:00Z',
    timeEnd: '2024-03-15T11:30:00Z',
    tracks: ['Backend'],
  },
  {
    id: 3,
    name: 'The Future of AI in Mobile Apps',
    location: 'Main Hall',
    description:
      'Exploring how AI and machine learning are revolutionizing mobile app development.',
    speakerNames: ['Dr. Elena Rodriguez'],
    timeStart: '2024-03-15T14:00:00Z',
    timeEnd: '2024-03-15T15:00:00Z',
    tracks: ['AI/ML'],
  },
  {
    id: 4,
    name: 'Kubernetes for Mobile Backend Services',
    location: 'Room B',
    description:
      'Container orchestration strategies for mobile app backend infrastructure.',
    speakerNames: ['Ahmed Hassan'],
    timeStart: '2024-03-15T15:30:00Z',
    timeEnd: '2024-03-15T16:30:00Z',
    tracks: ['DevOps'],
  },
  {
    id: 5,
    name: 'Designing for Accessibility in Mobile Apps',
    location: 'Workshop Room',
    description: 'Hands-on workshop for creating inclusive mobile experiences.',
    speakerNames: ['Lisa Thompson'],
    timeStart: '2024-03-16T09:00:00Z',
    timeEnd: '2024-03-16T12:00:00Z',
    tracks: ['UX/UI'],
  },
  {
    id: 6,
    name: 'Mobile-First Web3 Applications',
    location: 'Room A',
    description:
      'Building decentralized applications optimized for mobile devices.',
    speakerNames: ['Raj Patel'],
    timeStart: '2024-03-16T14:00:00Z',
    timeEnd: '2024-03-16T15:00:00Z',
    tracks: ['Blockchain'],
  },
  // Multi-speaker session
  {
    id: 7,
    name: 'Panel: The Future of Mobile Development',
    location: 'Main Hall',
    description:
      'Industry leaders discuss emerging trends and technologies in mobile development.',
    speakerNames: ['Sarah Chen', 'Dr. Elena Rodriguez', 'Lisa Thompson'],
    timeStart: '2024-03-16T16:00:00Z',
    timeEnd: '2024-03-16T17:00:00Z',
    tracks: ['Panel'],
  },
];

// Locations

export const mockLocations: Location[] = [
  {
    id: 1,
    name: 'Madison Convention Center',
    lat: 43.0747,
    lng: -89.3841,
    center: true, // Center map here
  },
  {
    id: 2,
    name: 'Austin City Hall',
    lat: 30.2672,
    lng: -97.7431,
  },
  {
    id: 3,
    name: 'Chicago Cultural Center',
    lat: 41.8838,
    lng: -87.6251,
  },
  {
    id: 4,
    name: 'Seattle Town Hall',
    lat: 47.6062,
    lng: -122.3321,
  },
  {
    id: 5,
    name: 'Boston Conference Center',
    lat: 42.3601,
    lng: -71.0589,
  },
];

// Speaker Sessions

export const mockSpeakerSessions = createSpeakerSessionsMap(
  mockSpeakers,
  mockSessions,
);

// Schedule

export const mockSchedule = {
  date: '2047-05-17',
  groups: [
    {
      time: '9:15 am',
      sessions: [
        {
          id: 2,
          name: 'Getting Started with Ionic',
          location: 'Hall 2',
          description:
            'Mobile devices and browsers are now advanced enough that developers can build native-quality mobile apps using open web technologies like HTML5, Javascript, and CSS.',
          speakerNames: ['Ted Turtle'],
          timeStart: '9:30 am',
          timeEnd: '9:45 am',
          tracks: ['Ionic'],
        },
        {
          id: 3,
          name: 'Ionic Tooling',
          location: 'Executive Ballroom',
          description:
            'Mobile devices and browsers are now advanced enough that developers can build native-quality mobile apps using open web technologies.',
          speakerNames: ['Rachel Rabbit'],
          timeStart: '9:45 am',
          timeEnd: '10:00 am',
          tracks: ['Tooling'],
        },
      ],
    },
    {
      time: '10:00 am',
      sessions: [
        {
          id: 5,
          name: 'Migrating to Ionic',
          location: 'Hall 1',
          description:
            'Mobile devices and browsers are now advanced enough that developers can build native-quality mobile apps.',
          speakerNames: ['Eva Eagle', 'Lionel Lion'],
          timeStart: '10:00 am',
          timeEnd: '10:15 am',
          tracks: ['Ionic'],
        },
      ],
    },
  ],
};
