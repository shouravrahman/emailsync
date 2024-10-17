import { db } from "@/server/db";

export async function POST(req: Request) {
  const { data } = await req.json();
  const email = data.email_addresses[0].email_address;
  const firstName = data.first_name;
  const lastName = data.last_name;
  const imageUrl = data.image_url;
  const id = data.id;

  await db.user.create({
    data: {
      id: id,
      emailAddress: email,
      firstName: firstName,
      lastName: lastName,
      imageUrl: imageUrl,
    },
  });
  return new Response("webhook recieved", { status: 200 });
}
