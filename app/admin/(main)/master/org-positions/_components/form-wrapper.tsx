import FormOrganizationPosition from "./form";
import { getOrganizationPositionById } from "@/lib/data/OrganizationPosition";
import { notFound } from "next/navigation";

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
    if (!position) {
      notFound();
    }
    return <FormOrganizationPosition mode={mode} orgPos={position} />;
  }
}
