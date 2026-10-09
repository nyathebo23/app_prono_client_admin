import { PlayerSex } from "../../../shared/utils/enums/player-sex";
import { TeamKind } from "../../team/enums/team-kind";
import { CompetitionPhase } from "../enums/competition-phase";
import { CompetitionScope } from "../enums/competition-scope";
import { CompetitionType } from "../enums/competition-type";

export interface CompetitionDto {
    id: string;
    name: string;
    startDatetime: Date;
    endDatetime: Date;
    numberOfTeams: number;
    countryCode: string | null;
    participantKind: TeamKind;
    type: CompetitionType;
    phase: CompetitionPhase;
    scope: CompetitionScope;
    playerSex: PlayerSex;

}