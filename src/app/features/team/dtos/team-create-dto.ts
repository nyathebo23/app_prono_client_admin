import { PlayerSex } from "../../../shared/utils/enums/player-sex";
import { TeamKind } from "../enums/team-kind";

export interface TeamCreateDto {
    name: string;
    kind: TeamKind;
    countryCode: string;
    playerSex: PlayerSex;
}