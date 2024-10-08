import SidebarFrame from "@/components/SidebarFrame";
import { withSessionSsr } from "@/lib/withSession";

export const getServerSideProps = withSessionSsr(async ({ req, res }) => {
  const user = req.session.user || null;
  return {
    props: { user },
  };
});

export default function Home({ user }: any) {
  return <SidebarFrame user={user}>{JSON.stringify(user)}</SidebarFrame>;
}
