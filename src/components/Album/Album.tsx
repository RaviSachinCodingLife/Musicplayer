import { Box, Typography } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircleFilled";
import { FC } from "react";

interface AlbumCardProps {
  title: string;
  artist: string;
  image: string;
  showRadius: boolean;
}

const AlbumCard: FC<AlbumCardProps> = ({
  title,
  artist,
  image,
  showRadius,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      gap={1}
      sx={{
        width: "148px",
        "&:hover .play-icon": {
          opacity: 1,
        },
      }}
    >
      {/* Image with icon */}
      <Box
        position="relative"
        width="148px"
        height="148px"
        sx={{ cursor: "pointer", borderRadius: "8px", overflow: "hidden" }}
      >
        <Box
          component="img"
          src={image}
          alt={title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: showRadius ? "50%" : "8px",
            display: "block",
          }}
        />

        {/* Icon */}
        <Box
          className="play-icon"
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            opacity: 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <PlayCircleIcon sx={{ color: "#8d2c91", fontSize: "50px" }} />
        </Box>
      </Box>

      {/* Info */}
      <Box display="flex" flexDirection="column">
        <Typography variant="body1" noWrap>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "grey" }} noWrap>
          {artist}
        </Typography>
      </Box>
    </Box>
  );
};

export default AlbumCard;
