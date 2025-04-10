import { useEffect, useRef, useState } from "react";

export const useMusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [state, setState] = useState({
    isPlaying: false,
    progress: 0,
    duration: 0,
    volume: 1,
  });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () =>
      setState((prev) => ({ ...prev, progress: audio.currentTime }));
    const setAudioDuration = () =>
      setState((prev) => ({ ...prev, duration: audio.duration }));
    const handlePlay = () => setState((prev) => ({ ...prev, isPlaying: true }));
    const handlePause = () =>
      setState((prev) => ({ ...prev, isPlaying: false }));

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

    state.isPlaying ? audio.pause() : audio.play();
  };

  const handleSliderChange = (_: Event, value: number | number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = typeof value === "number" ? value : value[0];
    audio.currentTime = newTime;
    setState((prev) => ({ ...prev, progress: newTime }));
  };

  const handleVolumeChange = (_: Event, value: number | number[]) => {
    const newVolume = typeof value === "number" ? value : value[0];
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setState((prev) => ({ ...prev, volume: newVolume }));
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  return {
    state,
    audioRef,
    togglePlay,
    handleSliderChange,
    handleVolumeChange,
    formatTime,
  };
};
