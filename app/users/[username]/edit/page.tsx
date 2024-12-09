export default async function UserEditPage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = await params;
  return <div>UserEditPage</div>;
}
