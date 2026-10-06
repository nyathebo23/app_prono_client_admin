import { PlayerSex } from "../../../shared/utils/enums/player-sex";
import { TeamKind } from "../../team/enums/team-kind";
import { CompetitionScope } from "../enums/competition-scope";
import { TeamInCompetitionDto } from "./team-in-competition-dto";

export interface CompetitionExtendedDto {
    id: string;
    name: string;
    startDatetime: Date;
    endDatetime: Date;
    numberOfTeams: number;
    countryCode: string | null;
    participantKind: TeamKind;
    scope: CompetitionScope;
    playerSex: PlayerSex;
    teamsInCompetition: TeamInCompetitionDto[];
}

