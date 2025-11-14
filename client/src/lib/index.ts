// place files you want to import through the `$lib` alias in this folder.


export type Team = {
    name: string,
    number: number,
}

export type Score = {
    total: number,

}

export type Match = {
    team: Team,
    score_id: number
}

export type Round = {
    table1: Match | null,
    table2: Match | null,
    table3: Match | null,
    table4: Match | null,
    table5: Match | null,
    table6: Match | null,
}

export type Schedule = {
    roundSchedule: Round[]
    judgingSchedule: any[]
}

export type Event = {
    type: "Regional" | "SuperRegional" | "Offseason",
    season: string,
    team_ids: number[],
    schedule_id: number,
    rankings_ids: number[],
}