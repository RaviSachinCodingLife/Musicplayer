import { Box, IconButton, Slider, Typography, Avatar } from "@mui/material";
import {
  PlayArrow,
  Pause,
  VolumeUp,
  SkipNext,
  SkipPrevious,
} from "@mui/icons-material";
import { AudioPlayerProps } from "./types";
import { useMusicPlayer } from "./useMusicPlayerHook";
import * as style from "./style";

const MusicPlayer = ({
  title,
  artist,
  image,
  audioSrc,
  onNext,
  onPrevious,
}: AudioPlayerProps) => {
  const {
    state,
    audioRef,
    togglePlay,
    handleSliderChange,
    handleVolumeChange,
    formatTime,
  } = useMusicPlayer();

  const controlButtons = [
    { icon: <SkipPrevious sx={{ color: "white" }} />, onClick: onPrevious },
    {
      icon: state.isPlaying ? (
        <Pause sx={{ color: "white" }} />
      ) : (
        <PlayArrow sx={{ color: "white" }} />
      ),
      onClick: togglePlay,
    },
    { icon: <SkipNext sx={{ color: "white" }} />, onClick: onNext },
  ];

  return (
    <Box sx={style.mainBoxStyle}>
      {/*Song Info */}
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar variant="rounded" src={image} sx={style.avtarStyle} />
        <Box>
          <Typography fontWeight={600}>{title}</Typography>
          <Typography variant="body2" color="gray">
            {artist}
          </Typography>
        </Box>
      </Box>

      {/*Controls */}
      <Box display="flex" alignItems="center" gap={2} flex={1} px={4}>
        {controlButtons.map((btn, idx) => (
          <IconButton key={idx} onClick={btn.onClick}>
            {btn.icon}
          </IconButton>
        ))}

        <Typography variant="body2" width={40}>
          {formatTime(state.progress)}
        </Typography>

        <Slider
          value={state.progress}
          max={state.duration}
          onChange={handleSliderChange}
          sx={style.siderStyle}
        />

        <Typography variant="body2" width={40}>
          {formatTime(state.duration)}
        </Typography>
      </Box>

      {/*Volume */}
      <Box sx={style.volBoxStyle}>
        <VolumeUp />
        <Slider
          value={state.volume}
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
