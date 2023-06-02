import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  if (!session) return;

  return (
    <Layout>
      <div className="text-blue-900 font-bold flex items-center justify-between">
        Hello, {session?.user?.email}
        <div className="flex items-center gap-2 text-black text-xl rounded-lg m-2 overflow-hidden cursor-pointer">
          <img
            src={session?.user?.image}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          {session?.user?.name}
        </div>
      </div>
    </Layout>
  );
}
