// place files you want to import through the `$lib` alias in this folder.

import { getEvent, getMatch, getScore } from "./db";


export type Team = {
    name: string,
    number: number,
}

export type Score = {
    id?: number ,
    total: number | null,
    equipment_inspection: boolean | null,
    mission01: {
        part1: number | null,
        part2: boolean | null,
    } | null,
    mission02: {
        part1: number | null,
    } | null,
    mission03: {
        part1: boolean | null,
        part2: boolean | null,
    } | null,
    mission04: {
        part1: boolean | null,
        part2: boolean | null,
    } | null,
    mission05: {
        part1: boolean | null,
    } | null,
    mission06: {
        part1: number | null,
    } | null,
    mission07: {
        part1: boolean | null,
    } | null,
    mission08: {
        part1: number | null,
    } | null,
    mission09: {
        part1: boolean | null,
        part2: boolean | null,
    } | null,
    mission10: {
        part1: boolean | null,
        part2: boolean | null,
    } | null,
    mission11: {
        part1: boolean | null,
        part2: boolean | null,
    }| null,
    mission12: {
        part1: boolean | null,
        part2: boolean | null,
    }| null,
    mission13: {
        part1: boolean | null,
    } | null,
    mission14: {
        part1: number | null,
    } | null,
    mission15: {
        part1: number | null,
    } | null,
    precision_tokens: number | null,
    gracious_professionalism: number | null,
    match_id?: number, 
    table?: number
}

export let blankScore: Score = {
    total: 0,
    equipment_inspection: null,
    mission01: {
        part1: null,
        part2: null,
    },
    mission02: {
        part1: null,
    },
    mission03: {
        part1: null,
        part2: null,
    },
    mission04: {
        part1: null,
        part2: null,
    },
    mission05: {
        part1: null,
    },
    mission06: {
        part1: null,
    },
    mission07: {
        part1: null,
    },
    mission08: {
        part1: null,
    },
    mission09: {
        part1: null,
        part2: null,
    },
    mission10: {
        part1: null,
        part2: null,
    },
    mission11: {
        part1: null,
        part2: null,
    },
    mission12: {
        part1: null,
        part2: null,
    },
    mission13: {
        part1: null,
    },
    mission14: {
        part1: null,
    },
    mission15: {
        part1: null,
    },
    precision_tokens: null,
    gracious_professionalism: 3,
};

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

export const calculateHighestScore = async(team_number: number, eventId: number) => {
    console.log(team_number)
    const event = (await getEvent(eventId))![0] as unknown as any;
    console.log(event)
    let highestScore = 0;
    let highestScoreId = 0;
    for (let matchId of event.schedule.matches) {
        let match = (await getMatch(matchId))![0] as unknown as any;
        console.log(match)
        let table1_team = match.table1!.team;
        let table2_team = match.table2!.team;
        let table3_team = match.table3!.team;
        let table4_team = match.table4!.team;
        let table5_team = match.table5!.team;
        let table6_team = match.table6!.team;
        if(table1_team == team_number) {
            let score = (await getScore(match.table1.score))![0] as unknown as any;
            if(score && score.total > highestScore) {
                highestScore = score.total;
                highestScoreId = score.id;
            }
        }
        if(table2_team == team_number) {
            let score = (await getScore(match.table2.score))![0] as unknown as any;
            if(score && score.total > highestScore) {
                highestScore = score.total;
                highestScoreId = score.id;
            }
        }
        if(table3_team == team_number) {
            let score = (await getScore(match.table3.score))![0] as unknown as any;
            if(score && score.total > highestScore) {
                highestScore = score.total;
                highestScoreId = score.id;
            }
        }
        if(table4_team == team_number) {
            let score = (await getScore(match.table4.score))![0] as unknown as any;
            if(score && score.total > highestScore) {
                highestScore = score.total;
                highestScoreId = score.id;
            }
        }
        if(table5_team == team_number) {
            let score = (await getScore(match.table5.score))![0] as unknown as any;
            if(score && score.total > highestScore) {
                highestScore = score.total;
                highestScoreId = score.id;
            }
        }
        if(table6_team == team_number) {
            let score = (await getScore(match.table6.score))![0] as unknown as any;
            if(score && score.total > highestScore) {
                highestScore = score.total;
                highestScoreId = score.id;
            }
        }
    }
    console.log(highestScore)
    console.log(highestScoreId)
    return highestScoreId;
}