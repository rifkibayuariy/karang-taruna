import FormOrganizationPosition from "./form";
import { getOrganizationPositionById } from "@/lib/data/OrganizationPosition";

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
    const position = await getOrganizationPositionById(Number(id));
    return <FormOrganizationPosition mode={mode} orgPos={position} />;
  }
}
