import { environment } from "../../../environment/environment.development";

export const API_ENDPOINTS = {
  TEAM: environment.apiUrl + '/teams',
  COMPETITION: environment.apiUrl + '/competitions',
  MATCH_COMMAND: environment.apiUrl + '/match-command',
  MATCH_QUERY: environment.apiUrl + '/match-db-read',
  MATCH_LIVE: environment.apiUrl + '/match-live',
  GOAL_COMMAND: environment.apiUrl + '/goal-command',
  TEAM_IN_COMPETITION: environment.apiUrl + '/teams-in-competition',
}