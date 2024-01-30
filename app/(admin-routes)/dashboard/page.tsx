import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

async function getData(accessToken: string): Promise<string | undefined> {
  try {
    const response = await fetch("http://localhost:3000/dasboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });

    if (!response.ok) throw new Error("Could not get dashboard data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error", error);
  }
}

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session || !session.accessToken) return <h1>Not logged in</h1>;
  const data = await getData(session.accessToken);

  return (
    <div>
      <h1>Dashboard page</h1>
      <span>{JSON.stringify(data)}</span>
    </div>
  );
}
