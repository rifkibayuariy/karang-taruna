import { OrganizationPosition } from "@/types/OrganizationPosition";
import { Member } from "@/types/Member";
import { OrganizationPeriod } from "@/types/OrganizationPeriod";

export interface OrganizationStructurePositions {
  position: OrganizationPosition;
  members: Member[] | null;
}

export interface OrganizationStructure {
  period: OrganizationPeriod;
  structure: OrganizationStructurePositions[] | null;
}
