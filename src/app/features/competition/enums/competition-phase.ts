export enum CompetitionPhase {
    LEAGUE_PHASE = 'LEAGUE_PHASE',
    KNOCKOUT_PHASE = 'KNOCKOUT_PHASE'
};

export const competitionPhases = [
    { value: CompetitionPhase.LEAGUE_PHASE, label: 'Phase de league' },
    { value: CompetitionPhase.KNOCKOUT_PHASE, label: 'Phase à élimination directe' },
];
