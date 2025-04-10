import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import AlbumCard from "../../components/Album/Album";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";
import AddIcon from "@mui/icons-material/Add";
import albumData from "../../json/AlbumCard.json";
import { useHome } from "./useHomeHook";
import * as style from "./style";

const Home = () => {
  const {
    state,
    setState,
    handleAlbumClick,
    handleAddToPlaylist,
    handleNextSong,
    handlePreviousSong,
    availableToAdd,
    categories,
  } = useHome();

  const filteredAlbums = (
    key: string,
    range: [number, number],
    isExpanded: boolean
  ) => {
    return albumData.filter((album) => {
      const matchCategory = album.category === key;
      const matchRange =
        isExpanded || (album.id >= range[0] && album.id <= range[1]);
      const matchSearch =
        album.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        album.artist.toLowerCase().includes(state.searchQuery.toLowerCase());

      return matchCategory && matchRange && matchSearch;
    });
  };

  const renderAlbumList = (
    albums: typeof albumData,
    onClick: (album: (typeof albumData)[0]) => void
  ) => {
    if (albums.length === 0) {
      return <Typography color="gray">No songs found</Typography>;
    }

    return albums.map((album) => (
      <Box
        key={album.id}
        display="flex"
        alignItems="center"
        gap={1}
        mb={1}
        onClick={() => onClick(album)}
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
    ));
  };

  const renderSection = ({
    title,
    key,
    range,
  }: (typeof categories)[number]) => {
    const isExpanded = state.expandedSection === key;
    const filteredData = filteredAlbums(key, range, isExpanded);
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
            onClick={() =>
              setState((prev) => ({
                ...prev,
                expandedSection: isExpanded ? null : key,
              }))
            }
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
    <Box sx={style.layoutWrapper}>
      <NavBar
        showSearchBar
        showProfile
        showSupport
        showMobileView
        onSearchChange={(value) =>
          setState((prev) => ({ ...prev, searchQuery: value }))
        }
      />

      <Box sx={style.mainContainer}>
        {/* Sidebar */}
        <Box sx={style.sidebar(!!state.selectedAlbum)}>
          <Box sx={style.sidebarBoxStyle}>
            <Typography variant="h6" color="#fff" fontWeight={600}>
              Your Library
            </Typography>
            <Tooltip title="Add album to playlist">
              <IconButton
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    showAddMode: !prev.showAddMode,
                  }))
                }
              >
                <AddIcon sx={{ color: "#fff" }} />
              </IconButton>
            </Tooltip>
          </Box>

          <Typography variant="subtitle1" fontWeight={600} color="#fff" mb={1}>
            Playlist
          </Typography>
          {renderAlbumList(state.playlist, handleAlbumClick)}

          {state.showAddMode && (
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
              {renderAlbumList(availableToAdd, handleAddToPlaylist)}
            </>
          )}
        </Box>

        {/* Main Content */}
        <Box sx={style.mainContent(!!state.selectedAlbum)}>
          <Box sx={style.contentInnerBox}>
            {categories
              .filter(
                (section) =>
                  state.expandedSection === null ||
                  state.expandedSection === section.key
              )
              .map((section) => renderSection(section))}
          </Box>
        </Box>
      </Box>

      {/* Music Player */}
      {state.selectedAlbum && (
        <Box px={2}>
          <MusicPlayer
            title={state.selectedAlbum.title}
            artist={state.selectedAlbum.artist}
            image={state.selectedAlbum.image}
            audioSrc={state.selectedAlbum.audio}
            onNext={handleNextSong}
            onPrevious={handlePreviousSong}
          />
        </Box>
      )}
    </Box>
  );
};

export default Home;
