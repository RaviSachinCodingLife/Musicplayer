import { Box, Typography } from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import albumData from "../../json/AlbumCard.json";
import { useState } from "react";
import AlbumCard from "../../components/Album/Album";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";

const Home = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<{
    title: string;
    artist: string;
    image: string;
    audio: string;
  } | null>(null);

  const categories: {
    title: string;
    key: string;
    range: [number, number];
  }[] = [
    {
      title: "Trending Songs",
      key: "Trending",
      range: [1, 6],
    },
    {
      title: "Popular Artists",
      key: "Popular Artist",
      range: [7, 14],
    },
    {
      title: "Popular Albums and Singles",
      key: "Album & Singles",
      range: [15, 22],
    },
  ];

  const handleAlbumClick = (album: (typeof albumData)[0]) => {
    setSelectedAlbum(album);
  };

  const renderSection = (
    title: string,
    key: string,
    range: [number, number]
  ) => {
    const isExpanded = expandedSection === key;

    const filteredData = isExpanded
      ? albumData.filter((album) => album.category === key)
      : albumData.filter(
          (album) =>
            album.category === key &&
            album.id >= range[0] &&
            album.id <= range[1]
        );

    const isPopularArtist = key === "Popular Artist";

    return (
      <Box key={key}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight={600}>
            {title}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "grey", cursor: "pointer" }}
            onClick={() => setExpandedSection(isExpanded ? null : key)}
          >
            {isExpanded ? "Show Less" : "Show All"}
          </Typography>
        </Box>
        <Box display="flex" flexWrap="wrap" gap={2}>
          {filteredData.map((album) => (
            <Box
              key={album.id}
              onClick={() => handleAlbumClick(album)}
              sx={{ cursor: "pointer" }}
            >
              <AlbumCard
                title={album.title}
                artist={album.artist}
                image={album.image}
                showRadius={isPopularArtist}
              />
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <Box display="flex" flexDirection="column">
      <NavBar
        showSearchBar={true}
        showProfile={true}
        showSupport={true}
        showMobileView={true}
      />

      <Box display="flex" gap={1} mx={2}>
        {/* Sidebar */}
        <Box
          bgcolor="#212121"
          borderRadius="10px"
          width="30%"
          height="80vh"
        ></Box>

        {/* Main Content */}
        <Box
          bgcolor="#212121"
          borderRadius="10px"
          width="70%"
          height="80vh"
          overflow="auto"
        >
          <Box display="flex" flexDirection="column" gap={4} mx={3} my={3}>
            {categories
              .filter(
                (section) =>
                  expandedSection === null || section.key === expandedSection
              )
              .map((section) =>
                renderSection(section.title, section.key, section.range)
              )}
          </Box>
        </Box>
      </Box>

      {/* Audio player when album is clicked */}
      {selectedAlbum && (
        <Box px={2}>
          <MusicPlayer
            title={selectedAlbum.title}
            artist={selectedAlbum.artist}
            image={selectedAlbum.image}
            audioSrc={selectedAlbum.audio}
          />
        </Box>
      )}
    </Box>
  );
};

export default Home;
