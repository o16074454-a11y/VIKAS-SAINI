export type TimeMood = 'morning' | 'afternoon' | 'sunset' | 'night';

export interface PlaylistItem {
  id: string;
  title: string;
  hindiTitle: string;
  playlistId: string;
  youtubeUrl: string;
  category: string;
  iconName: string;
  color: string;
  description: string;
  popularTracks: {
    title: string;
    artist: string;
    duration: string;
  }[];
}

export interface NostalgicQuote {
  id: string;
  text: string;
  author: string;
  tag: string;
  timeContext: string;
}

export interface VillageMemory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  hindiStory: string;
  audioKey: 'bell' | 'tubewell' | 'radio' | 'cricket' | 'temple' | 'cassette';
  category: string;
  quote: string;
}

export interface VisitorMemory {
  id: string;
  author: string;
  location: string;
  text: string;
  timestamp: string;
  likes: number;
  moodEmoji: string;
}
