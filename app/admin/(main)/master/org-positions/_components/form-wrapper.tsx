import FormOrganizationPosition from "./form";

export default async function FormOrganizationPositionWrapper({
  mode,
  id,
}: {
  mode: "new" | "edit";
  id?: number;
}) {
  if (mode == "new") {
    return <FormOrganizationPosition mode={mode} />;
  } else if (mode == "edit") {
    return <FormOrganizationPosition mode={mode} />;
  }
}
