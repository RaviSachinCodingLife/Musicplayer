import { useEffect, useRef, useState } from "react";
import { Box, IconButton, Slider, Typography, Avatar } from "@mui/material";
import {
  PlayArrow,
  Pause,
  VolumeUp,
  SkipNext,
  SkipPrevious,
} from "@mui/icons-material";

interface AudioPlayerProps {
  title: string;
  artist: string;
  image: string;
  audioSrc: string;
}

const MusicPlayer = ({ title, artist, image, audioSrc }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => setProgress(audio.currentTime);
    const setAudioDuration = () => setDuration(audio.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", setAudioDuration);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", setAudioDuration);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const handleSliderChange = (_: Event, value: number | number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = typeof value === "number" ? value : value[0];
    audio.currentTime = newTime;
    setProgress(newTime);
  };

  const handleVolumeChange = (_: Event, value: number | number[]) => {
    const newVolume = typeof value === "number" ? value : value[0];
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bgcolor="#000"
      px={2}
      py={1}
      color="#fff"
      borderRadius="10px"
    >
      {/* Left: Song Info */}
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar variant="rounded" src={image} sx={{ width: 56, height: 56 }} />
        <Box>
          <Typography fontWeight={600}>{title}</Typography>
          <Typography variant="body2" color="gray">
            {artist}
          </Typography>
        </Box>
      </Box>

      {/* Center: Controls */}
      <Box display="flex" alignItems="center" gap={2} flex={1} px={4}>
        <IconButton>
          <SkipPrevious sx={{ color: "white" }} />
        </IconButton>
        <IconButton onClick={togglePlay}>
          {isPlaying ? (
            <Pause sx={{ color: "white" }} />
          ) : (
            <PlayArrow sx={{ color: "white" }} />
          )}
        </IconButton>
        <IconButton>
          <SkipNext sx={{ color: "white" }} />
        </IconButton>

        <Typography variant="body2" width={40}>
          {formatTime(progress)}
        </Typography>

        <Slider
          value={progress}
          max={duration}
          onChange={handleSliderChange}
          sx={{ color: "white", flex: 1 }}
        />

        <Typography variant="body2" width={40}>
          {formatTime(duration)}
        </Typography>
      </Box>

      {/* Right: Volume */}
      <Box display="flex" alignItems="center" gap={1} width={200}>
        <VolumeUp />
        <Slider
          value={volume}
          onChange={handleVolumeChange}
          min={0}
          max={1}
          step={0.01}
          sx={{ color: "#fff" }}
        />
      </Box>

      <audio ref={audioRef} autoPlay src={audioSrc} />
    </Box>
  );
};

export default MusicPlayer;
