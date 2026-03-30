import { fetchProfileAction } from "@/actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Home() {
  const user = await currentUser();
  console.log(user, 'current user');

  const profileInfo = await  fetchProfileAction(user?.id) ;

  if(user && !profileInfo?._id) redirect('/onboard');

  return <section>main content</section>;
}

export default Home;