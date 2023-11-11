import { GiphyFetch } from "@giphy/js-fetch-api";
import { IGif } from "@giphy/js-types";
import {
  Grid,
} from "@giphy/react-components";
import React, { useCallback } from "react";
import { Box, SxProps, Typography, Theme } from "@mui/material";

const giphyFetch = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY)

interface GifBoxProps {
  onChoose: (msg: string) => void
}

const GifBox = ({ onChoose }: GifBoxProps) => {
  const fetchGifs = (offset: number) =>
    giphyFetch.search("cat", { offset, limit: 10 });

  const handleClick = useCallback((gif: IGif, e: React.SyntheticEvent<HTMLElement, Event> ) => {
    onChoose(`[img]${gif.images.original.webp}[/img]`);
    e.preventDefault();
    e.stopPropagation();
  }, [])

  return (
    <Box width={400} height={500} sx={{position: "relative"}}>
      <Box width={400} height={500} overflow="scroll">
        <Grid
          onGifClick={handleClick}
          fetchGifs={fetchGifs}
          width={400}
          columns={3}
          gutter={6}
        />
      </Box>
      <Box sx={attrSx}>
        <Typography sx={{color: "#fff"}}>Powered By GIPHY</Typography>
      </Box>
    </Box>
  )
}

export default GifBox

const attrSx:SxProps<Theme> = {
  position: 'absolute',
  right: t => t.spacing(1),
  bottom: t => t.spacing(1),
  p: 1,
  background: "black",
}