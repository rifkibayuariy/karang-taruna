import FormLocation from "./form";
import { getLocationById } from "@/lib/data/Location";

export default async function FormLocationWrapper({
  mode,
  id,
}: {
  mode: "new" | "edit";
  id?: number;
}) {
  if (mode == "new") {
    return <FormLocation mode={mode} />;
  } else if (mode == "edit") {
    const location = await getLocationById(Number(id));
    return <FormLocation mode={mode} location={location} />;
  }
}
