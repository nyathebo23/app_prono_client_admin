import { TeamDto } from "../../team/dtos/team-dto";

export interface TeamInCompetitionDto {
    id: string;
    team: TeamDto;
    isActive: boolean;
}