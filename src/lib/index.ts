// place files you want to import through the `$lib` alias in this folder.


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
