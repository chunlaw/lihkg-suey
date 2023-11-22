import { GiphyFetch, SearchOptions } from "@giphy/js-fetch-api";
import { IGif } from "@giphy/js-types";
import {
  Grid,
} from "@giphy/react-components";
import { Box, SxProps, TextField, Theme, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import debounce from "lodash.debounce";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const giphyFetch = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY)

interface GifBoxProps {
  onChoose: (msg: string) => void
}

const GifBox = ({ onChoose }: GifBoxProps) => {
  const [search, setSearch] = useState<string>("")
  const [sort, setSort] = useState<SearchOptions["sort"]>("relevant")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const fetchGifs = useCallback((offset: number) =>
    giphyFetch.search(search || "cats", { offset, limit: 20, sort, type: "gifs" })
  , [search, sort]);

  const handleClick = useCallback((gif: IGif, e: React.SyntheticEvent<HTMLElement, Event> ) => {
    onChoose(`[img]${gif.images.original.webp}[/img]`);
    e.preventDefault();
    e.stopPropagation();
  }, [])

  const refreshSearch = useMemo(() => debounce(() => {
    setIsLoading(true)
    setInterval(() => {
      setIsLoading(false)
    }, 100)
  }, 500), [])

  useEffect(() => {
    if ( typeof fetchGifs === "function" ) {
      refreshSearch()
    }
  }, [fetchGifs, refreshSearch])

  return (
    <Box width={860} height={500} position="relative" textAlign="center" display="flex" flexDirection="column" gap={1}>
      <Box display="flex" justifyContent="space-between">
        <TextField
          variant="standard"
          value={search}
          onChange={({target: { value }}) => setSearch(value)}
          size="small"
          placeholder="cats"
        />
        <ToggleButtonGroup value={sort} onChange={(_, v) => setSort(v)} size="small" exclusive>
          <ToggleButton value="relevant">相關</ToggleButton>
          <ToggleButton value="recent">最新</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box width={860} height={450} overflow="scroll" marginX="auto">
        {!isLoading && <Grid
          onGifClick={handleClick}
          fetchGifs={fetchGifs}
          width={860}
          columns={6}
          gutter={6}
        />}
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