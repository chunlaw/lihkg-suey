import { Dialog, DialogTitle, Button, DialogContent, Box, Typography, Chip, SxProps, Theme, Tabs, Tab } from "@mui/material"
import { useCallback, useState } from "react"
import { QuickreplyOutlined as QuickreplyOutlinedIcon } from "@mui/icons-material"
import GifBox from "./GifBox"

interface TemplateLoadBtnProps {
  onChoose: (msg: string) => void
}

const TemplateLoadBtn = ({onChoose}: TemplateLoadBtnProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [tab, setTab] = useState<"msg" | "gif">("msg")

  const handleChoose = useCallback((msg: string) => {
    onChoose(msg)
    setOpen(false)
  }, [onChoose])

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

const templates: TemplateMsg[] = [
  {id: "msg000001", type: "百搭", msg: "呢關一定過到的！請你都唔好放棄生命！！",},
  {id: "msg000002", type: "百搭", msg: "珍惜生命 你一定會過到呢關 無野過唔到 請你好好珍惜自己",},
  {id: "msg000003", type: "百搭", msg: "放鬆啲啦 人生到尾都係一場空 不如開心hea 搵夠就算",},
  {id: "msg000004", type: "百搭", msg: "壞日子總會過去 無野係解決不了",},
  {id: "msg000005", type: "工作", msg: "如果財政容許 放自己三至六個月大假 當你辭職唔洗返工嗰陣 就會即刻覺得之前嘅所有野簡直好似微塵一樣",},
  {id: "msg000006", type: "工作", msg: "會唔會轉工作環境/工種 健康係無價 日日番工被攞命 為乜呢? 休息下都係好事",},
  {id: "msg000007", type: "工作", msg: "試吓將其他嘢放喺你生命嘅第一位 例如屋企人、寵物、朋友之餘此類 加油",},
  {id: "msg000008", type: "工作", msg: "返工只係為搵錢 轉換下心態唔好睇到返工咁重要或者會舒服啲",},
  {id: "msg000009", type: "百搭", msg: "有咩心事講出黎聽下",},
  {id: "msg000010", type: "百搭", msg: "連登有愛 講你問題出黎！",},
  {id: "msg000011", type: "百搭", msg: "唔好衝動 講下咩事？",},
  {id: "msg000012", type: "百搭", msg: "講出黎大家聽下",},
  {id: "msg000013", type: "百搭", msg: "人生總有高高低低 仲有好多美好事物等緊你！",},
  {id: "msg000014", type: "百搭", msg: "講出黎睇下有冇得一齊諗方法解決下",},
  {id: "msg000015", type: "百搭", msg: "講嚟聽下咩事先 有好多人係度開解你",},
  {id: "msg000016", type: "百搭", msg: "希望樓主你撐住",},
  {id: "msg000017", type: "百搭", msg: "樓主我想知，可唔可以講多少少",},
  {id: "msg000018", type: "百搭", msg: "可以攞出嚟大家傾，講出嚟可能已經可以舒服少少",},
  {id: "msg000019", type: "百搭", msg: "有咩唔開心想分享，呢度有連登仔聽",},
  {id: "msg000020", type: "百搭", msg: "可以分享下有咩唔開心 我地聽緊㗎",},
  {id: "msg000021", type: "百搭", msg: "做埋其他想做既野先，個次序無得調轉",},
  {id: "msg000022", type: "工作", msg: "自己先係最重要，工作呢啲你抽離返去睇，其實都唔係啲乜嘢。",},
  {id: "msg000023", type: "百搭", msg: "食個靚lunch啦 以食物安撫下心靈 食飽先有氣力諗人生下一步",},
  {id: "msg000024", type: "百搭", msg: "做自己緊要 唔好同其他人比 因為條條大路都可以通羅馬",},
  {id: "msg000025", type: "工作", msg: "慢慢摸索下點樣嘅生活先係對自己最舒服 唔一定明成利就",},
  {id: "msg000026", type: "百搭", msg: "宜家搵下啲會令自己開心嘅嘢做 約多啲朋友",},
  {id: "msg000027", type: "百搭", msg: "接受自己係一個普通人，唔好同人比較，咁會好過啲",},
  {id: "msg000028", type: "百搭", msg: "上黎連登發洩下咪幾好",},
  {id: "msg000029", type: "百搭", msg: "放低自己d要求 你眼中既世界會美好得多",},
  {id: "msg000030", type: "愛情", msg: "都無試過其他人又點會點其他人嘅好？",},
]