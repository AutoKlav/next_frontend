import { logout } from "@/utils/fetcher";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    logout().then(() => router.replace("/"));
  }, [router]);

  return <></>;
}
