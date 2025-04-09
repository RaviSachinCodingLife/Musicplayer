import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import albumData from "../../json/AlbumCard.json";
import { useState } from "react";
import AlbumCard from "../../components/Album/Album";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";
import AddIcon from "@mui/icons-material/Add";

const Home = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<{
    title: string;
    artist: string;
    image: string;
    audio: string;
  } | null>(null);

  const [playlist, setPlaylist] = useState<typeof albumData>([]);
  const [showAddMode, setShowAddMode] = useState(false);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories: {
    title: string;
    key: string;
    range: [number, number];
  }[] = [
    { title: "Trending Songs", key: "Trending", range: [1, 6] },
    { title: "Popular Artists", key: "Popular Artist", range: [7, 14] },
    {
      title: "Popular Albums and Singles",
      key: "Album & Singles",
      range: [15, 22],
    },
  ];

  const handleAlbumClick = (album: (typeof albumData)[0]) => {
    setSelectedAlbum(album);
  };

  const handleAddToPlaylist = (album: (typeof albumData)[0]) => {
    if (!playlist.find((a) => a.id === album.id)) {
      setPlaylist([...playlist, album]);
    }
    setShowAddMode(false);
  };

  const renderSection = (
    title: string,
    key: string,
    range: [number, number]
  ) => {
    const isExpanded = expandedSection === key;

    const filteredData = albumData.filter((album) => {
      const matchesCategory = album.category === key;
      const matchesRange =
        isExpanded || (album.id >= range[0] && album.id <= range[1]);
      const matchesSearch =
        album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        album.artist.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesRange && matchesSearch;
    });

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

  const availableToAdd = albumData.filter(
    (album) => !playlist.find((p) => p.id === album.id)
  );

  return (
    <Box display="flex" flexDirection="column">
      <NavBar
        showSearchBar
        showProfile
        showSupport
        showMobileView
        onSearchChange={(value) => setSearchQuery(value)}
      />

      <Box display="flex" gap={1} mx={2}>
        {/* Sidebar */}
        <Box
          bgcolor="#212121"
          borderRadius="10px"
          width="30%"
          height={selectedAlbum ? "80vh" : "90vh"}
          overflow={"auto"}
          p={2}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6" color="#fff" fontWeight={600}>
              Your Library
            </Typography>
            <Tooltip title="Add album to playlist">
              <IconButton onClick={() => setShowAddMode(!showAddMode)}>
                <AddIcon sx={{ color: "#fff" }} />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Playlist Albums */}
          <Typography variant="subtitle1" fontWeight={600} color="#fff" mb={1}>
            Playlist
          </Typography>
          {playlist.length === 0 ? (
            <Typography variant="body2" color="gray">
              No songs added yet
            </Typography>
          ) : (
            playlist.map((album) => (
              <Box
                key={album.id}
                display="flex"
                alignItems="center"
                gap={1}
                mb={1}
                onClick={() => handleAlbumClick(album)}
                sx={{ cursor: "pointer" }}
              >
                <img
                  src={album.image}
                  alt={album.title}
                  width={40}
                  height={40}
                  style={{ borderRadius: 4 }}
                />
                <Box>
                  <Typography fontSize={14} color="#fff">
                    {album.title}
                  </Typography>
                  <Typography fontSize={12} color="gray">
                    {album.artist}
                  </Typography>
                </Box>
              </Box>
            ))
          )}

          {/* Add-to-Playlist Mode */}
          {showAddMode && (
            <>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                color="#fff"
                mt={3}
                mb={1}
              >
                Add to Playlist
              </Typography>
              {availableToAdd.length === 0 ? (
                <Typography color="gray">No more albums to add</Typography>
              ) : (
                availableToAdd.map((album) => (
                  <Box
                    key={album.id}
                    display="flex"
                    alignItems="center"
                    gap={1}
                    mb={1}
                    onClick={() => handleAddToPlaylist(album)}
                    sx={{ cursor: "pointer" }}
                  >
                    <img
                      src={album.image}
                      alt={album.title}
                      width={40}
                      height={40}
                      style={{ borderRadius: 4 }}
                    />
                    <Box>
                      <Typography fontSize={14} color="#fff">
                        {album.title}
                      </Typography>
                      <Typography fontSize={12} color="gray">
                        {album.artist}
                      </Typography>
                    </Box>
                  </Box>
                ))
              )}
            </>
          )}
        </Box>

        {/* Main Content */}
        <Box
          bgcolor="#212121"
          borderRadius="10px"
          width="70%"
          height={selectedAlbum ? "80vh" : "90vh"}
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

      {/* Audio Player */}
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
