import { Box, CssBaseline, CssVarsProvider } from "@mui/joy";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function SidebarFrame({ user, children }: any) {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Sidebar user={user} />
        <Header />
        <Box
          component="main"
          className="MainContent"
          sx={{
            pt: {
              xs: "calc(12px + var(--Header-height))",
              md: 3,
            },
            pb: {
              xs: 2,
              sm: 2,
              md: 3,
            },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            height: "100dvh",
            gap: 1,
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
