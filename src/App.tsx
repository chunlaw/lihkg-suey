import { Box } from "@mui/material";
import TemplateLoadBtn from "./components/TemplateLoadBtn";
import { useCallback } from "react";

function App() {
  const pasteTemplate = useCallback((msg: string) => {
    document.getElementsByClassName('ProseMirror')[0].append(msg)
  }, [])

  return (
    <Box display="flex" gap={1}>
      <TemplateLoadBtn 
        onChoose={msg => pasteTemplate(msg)}
      />
    </Box>
  );
}

export default App;

