export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  description: string;
}

export const sampleAlbums: Album[] = [
  {
    id: '1',
    title: 'Midnight Echoes',
    artist: 'Luna Wave',
    coverUrl: 'https://picsum.photos/300/300?random=1',
    description: 'Slow, dreamy indie rock with reverb vocals, retro keys, and phased guitars',
  },
  {
    id: '2',
    title: 'Urban Nights',
    artist: 'The Midnight Collective',
    coverUrl: 'https://picsum.photos/300/300?random=2',
    description: 'Smooth jazz fusion with electronic beats, saxophone solos, and ambient textures',
  },
  {
    id: '3',
    title: 'Ocean Depths',
    artist: 'Aqua Sound',
    coverUrl: 'https://picsum.photos/300/300?random=3',
    description: 'Atmospheric ambient music featuring whale songs, ocean waves, and ethereal synths',
  },
  {
    id: '4',
    title: 'Desert Winds',
    artist: 'Sahara Echo',
    coverUrl: 'https://picsum.photos/300/300?random=4',
    description: 'World music fusion blending traditional Middle Eastern instruments with modern production',
  },
  {
    id: '5',
    title: 'Electric Dreams',
    artist: 'Neon Pulse',
    coverUrl: 'https://picsum.photos/300/300?random=5',
    description: 'Synthwave revival with 80s nostalgia, driving basslines, and cinematic melodies',
  },
  {
    id: '6',
    title: 'Mountain High',
    artist: 'Alpine Folk',
    coverUrl: 'https://picsum.photos/300/300?random=6',
    description: 'Acoustic folk music with banjo, mandolin, and harmonies inspired by mountain landscapes',
  },
  {
    id: '7',
    title: 'Cosmic Journey',
    artist: 'Stellar Sound',
    coverUrl: 'https://picsum.photos/300/300?random=7',
    description: 'Space-themed electronic music with cosmic atmospheres and interstellar rhythms',
  },
  {
    id: '8',
    title: 'Forest Whispers',
    artist: 'Nature\'s Voice',
    coverUrl: 'https://picsum.photos/300/300?random=8',
    description: 'Organic nature sounds blended with gentle acoustic melodies and forest ambience',
  },
];
