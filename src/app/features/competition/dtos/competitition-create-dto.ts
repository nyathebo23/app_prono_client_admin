import { PlayerSex } from "../../../shared/utils/enums/player-sex";
import { TeamKind } from "../../team/enums/team-kind";
import { CompetitionPhase } from "../enums/competition-phase";
import { CompetitionScope } from "../enums/competition-scope";
import { CompetitionType } from "../enums/competition-type";

export interface CompetitionCreateDto {
    name: string;
    startDatetime: string;
    endDatetime: string;
    numberOfTeams: number;
    countryCode: string | undefined;
    participantKind: TeamKind;
    scope: CompetitionScope;
    playerSex: PlayerSex;
    competitionType: CompetitionType;
    phase: CompetitionPhase | undefined;
}