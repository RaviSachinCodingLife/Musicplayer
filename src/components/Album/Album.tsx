import { Box, Typography } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircleFilled";
import { FC } from "react";
import { AlbumCardProps } from "./types";
import * as style from "./style";

const AlbumCard: FC<AlbumCardProps> = ({
  title,
  artist,
  image,
  showRadius,
}) => {
  return (
    <Box sx={style.mainBoxStyle}>
      {/* Image with icon */}
      <Box position="relative" sx={style.imageBoxStyle}>
        <Box
          component="img"
          src={image}
          alt={title}
          sx={{ ...style.imageStyle, borderRadius: showRadius ? "50%" : "8px" }}
        />

        {/* Icon */}
        <Box className="play-icon" sx={style.iconBoxStyle}>
          <PlayCircleIcon sx={style.iconStyle} />
        </Box>
      </Box>

      {/* Info */}
      <Box display="flex" flexDirection="column">
        <Typography variant="body1" noWrap>
          {title}
        </Typography>
        <Typography variant="body2" color="grey" noWrap>
          {artist}
        </Typography>
      </Box>
    </Box>
  );
};

export default AlbumCard;
