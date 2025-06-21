export default async function EditMemberPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return (
    <>
      <>{id}</>
    </>
  );
}
