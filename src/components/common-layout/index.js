import { currentUser } from "@clerk/nextjs/server";
import Header from "../header";
import { fetchProfileAction } from "@/actions";

async function CommonLayout({ children }) {
  const user = await currentUser();

  const profileInfo = await fetchProfileAction(user?.id);

  return (
    <div className="max-w-7xl p-6 lg:px-8">
      {/* header component */}
      <Header profileInfo={profileInfo}  user={JSON.parse(JSON.stringify(user))} />

      {/* main component  */}
      <main>{children}</main>
    </div>
  );
}

export default CommonLayout;
