interface AudioPlayerProps {
  title: string;
  artist: string;
  image: string;
  audioSrc: string;
  onNext?: () => void;
  onPrevious?: () => void;
}

interface AlbumType {
  id: number;
  title: string;
  artist: string;
  image: string;
  audio: string;
  category: string;
}

export type { AudioPlayerProps, AlbumType };
