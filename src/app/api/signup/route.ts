import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const logout = searchParams.get("logout");

  const jar = await cookies();

  if (logout) {
    jar.set("session", "", {
      expires: new Date(0),
    });

    redirect("/signup");
  }

  jar.set("session", searchParams.get("username")!)
  redirect("/")
}
