import LoginForm from "@/components/LoginForm";
import SidebarFrame from "@/components/SidebarFrame";
import { withSessionSsr } from "@/lib/withSession";
import { Box, formLabelClasses } from "@mui/joy";

export const getServerSideProps = withSessionSsr(async ({ req, res }) => {
  const user = req.session.user || null;
  return {
    props: { user },
  };
});

export default function Login({ user }: any) {
  return (
    <SidebarFrame user={user}>
      <Box
        component="main"
        sx={{
          my: "auto",
          py: 2,
          pb: 5,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: 400,
          maxWidth: "100%",
          mx: "auto",
          borderRadius: "sm",
          "& form": {
            display: "flex",
            flexDirection: "column",
            gap: 2,
          },
          [`& .${formLabelClasses.asterisk}`]: {
            visibility: "hidden",
          },
        }}
      >
        <LoginForm />
      </Box>
    </SidebarFrame>
  );
}
