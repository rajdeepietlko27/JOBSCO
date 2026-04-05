import { currentUser } from "@clerk/nextjs/server";
import Header from "../header";
import { fetchProfileAction } from "@/actions";
import Footer from "../footer";

async function CommonLayout({ children }) {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);

  return (
    <div className="min-h-screen flex flex-col">
      <Header profileInfo={profileInfo} user={JSON.parse(JSON.stringify(user))} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default CommonLayout;