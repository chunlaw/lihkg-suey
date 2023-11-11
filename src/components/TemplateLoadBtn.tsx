import { Dialog, DialogTitle, Button, DialogContent, Box, Typography, Chip, SxProps, Theme, Tabs, Tab } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { QuickreplyOutlined as QuickreplyOutlinedIcon } from "@mui/icons-material"
import GifBox from "./GifBox"

interface TemplateLoadBtnProps {
  onChoose: (msg: string) => void
}

const TemplateLoadBtn = ({onChoose}: TemplateLoadBtnProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [tab, setTab] = useState<"msg" | "gif">("msg")
  const [templates, setTemplates] = useState<TemplateMsg[]>([])

  const handleChoose = useCallback((msg: string) => {
    onChoose(msg)
    setOpen(false)
  }, [onChoose])

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/chunlaw/lihkg-suey/main/data/msg.json")
      .then(r => r.json())
      .then(r => {
        setTemplates(shuffle(r))
      })
  }, [])

  return (
    <>
      <Button onClick={() => setOpen(true)} color="inherit" startIcon={<QuickreplyOutlinedIcon />}>
        插入快捷回覆
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
          >
            <Tab value="msg" label="文字" />
            <Tab value="gif" label="GIF" />
          </Tabs>
        </DialogTitle>
        <DialogContent>
          <Box display="flex" width="100%" flexDirection="column">
            {tab === "msg" && templates.map(({id, type, msg}) => (
              <Box key={id} display="flex" flexDirection="column" sx={rowSx} onClick={() => handleChoose(msg)}>
                <Typography>{msg}</Typography>
                <Box>
                  <Chip label={type} size="small" />
                </Box>
              </Box>
            ))}
            {tab === "gif" && (
              <GifBox onChoose={handleChoose} />
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TemplateLoadBtn

interface TemplateMsg {
  id: string,
  type: string,
  msg: string
}

const rowSx: SxProps<Theme> = {
  my: 2,
  p: 1,
  cursor: 'pointer',
  "&:hover": {   
    backdropFilter: 'brightness(120%)'
  }
}

function shuffle<T>(array: T[]) {
  const result = [], itemsLeft = array.concat([]);

  while (itemsLeft.length) {
    const randomIndex = Math.floor(Math.random() * itemsLeft.length);
    const [randomItem] = itemsLeft.splice(randomIndex, 1); // take out a random item from itemsLeft
    result.push(randomItem); // ...and add it to the result
  }

  return result;
}