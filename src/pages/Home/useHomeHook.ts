import { useState } from "react";
import { category } from "./types";
import albumData from "../../json/AlbumCard.json";
import { AlbumType } from "../../components/MusicPlayer/types";

export const useHome = () => {
  const [state, setState] = useState({
    expandedSection: null as string | null,
    selectedAlbum: null as (typeof albumData)[0] | null,
    playlist: [] as typeof albumData,
    showAddMode: false,
    searchQuery: "",
    currentCategoryKey: "",
    currentSongIndex: -1,
  });

  const handleAlbumClick = (album: AlbumType) => {
    const foundCategory = categories.find((cat) =>
      albumData.some((a, idx) => a.id === album.id && a.category === cat.key)
    );

    const currentCategoryKey = foundCategory?.key || "";
    const categoryAlbums = albumData.filter(
      (a) => a.category === currentCategoryKey
    );
    const currentSongIndex = categoryAlbums.findIndex((a) => a.id === album.id);

    setState((prev) => ({
      ...prev,
      selectedAlbum: album,
      currentCategoryKey,
      currentSongIndex,
    }));
  };

  const handleAddToPlaylist = (album: (typeof albumData)[0]) => {
    if (!state.playlist.find((a) => a.id === album.id)) {
      setState((prev) => ({
        ...prev,
        playlist: [...prev.playlist, album],
        showAddMode: false,
      }));
    }
  };

  const availableToAdd = albumData.filter(
    (album) => !state.playlist.find((p) => p.id === album.id)
  );

  const handleNextSong = () => {
    const categoryAlbums = albumData.filter(
      (a) => a.category === state.currentCategoryKey
    );

    const nextIndex = state.currentSongIndex + 1;
    if (nextIndex < categoryAlbums.length) {
      const nextAlbum = categoryAlbums[nextIndex];
      setState((prev) => ({
        ...prev,
        selectedAlbum: nextAlbum,
        currentSongIndex: nextIndex,
      }));
    }
  };

  const handlePreviousSong = () => {
    const categoryAlbums = albumData.filter(
      (a) => a.category === state.currentCategoryKey
    );

    const prevIndex = state.currentSongIndex - 1;
    if (prevIndex >= 0) {
      const prevAlbum = categoryAlbums[prevIndex];
      setState((prev) => ({
        ...prev,
        selectedAlbum: prevAlbum,
        currentSongIndex: prevIndex,
      }));
    }
  };

  const categories: category[] = [
    { title: "Trending Songs", key: "Trending", range: [1, 6] },
    { title: "Popular Artists", key: "Popular Artist", range: [7, 14] },
    {
      title: "Popular Albums and Singles",
      key: "Album & Singles",
      range: [15, 22],
    },
  ];
  return {
    state,
    setState,
    handleAlbumClick,
    handleAddToPlaylist,
    handleNextSong,
    handlePreviousSong,
    availableToAdd,
    categories,
  };
};
