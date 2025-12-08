import { createClient } from '@supabase/supabase-js'
import type { Database } from './db.types'
import  { env } from '$env/dynamic/public';
const supabaseUrl = env.PUBLIC_SUPABASE_URL || ""
const supabaseKey = env.PUBLIC_SUPABASE_KEY || ""

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
export type User = {
    name: string,
    team_number: number,
    admin: boolean,
    password: string,
}

const users: User[] = []

//Users
export const getUserByName = (name: string) => {
    const user = users.find(user => user.name === name)
    if (user) {
        return user
    }
    return null
}


// Events
export const getEvents = async () => {
    const { data, error } = await supabase.from('Event').select('*')
    if (error) {
        console.log(error)
        return null
    }
    return data
}
export const getEvent = async (id: number) => {
    const { data, error } = await supabase.from('Event').select('*').eq('id', id)
    if (error) {
        console.log(error)
        return null
    }
    return data
}
export const createEvent = async (event: any) => {
    const { data, error } = await supabase.from('Event').insert(event)
    if (error) {
        console.log(error)
        return null
    }
    return data
}
export const updateEvent = async (event: any) => {
    const { data, error } = await supabase.from('Event').update(event).eq('id', event.id)
    if (error) {
        console.log(error)
        return null
    }
    return data
}
export const deleteEvent = async (id: number) => {
    let event = (await getEvent(id))![0] as any;
    let schedule = event.schedule;
    let matches = schedule.matches;
    for (let match of matches) {
        deleteMatch(match);
    }
    const { data, error } = await supabase.from('Event').delete().eq('id', id)
    if (error) {
        console.log(error)
        return null
    }
    return data
}

//Teams
export const getTeams = async () => {
    const { data, error } = await supabase.from('Team').select('*')
    if (error) {
        console.log(error)
        return null
    }
    return data
}
export const getTeam = async (id: number) => {
    const { data, error } = await supabase.from('Team').select('*').eq('id', id)
    if (error) {
        console.log(error)
        return null
    }
    return data
}
export const createTeam = async (team: any) => {
    let teams = await getTeams();
    if (teams?.map((team: any) => team.number).indexOf(team.number) != -1) {
        console.log("Team with that number already exists")
        return null
    }
    const { data, error } = await supabase.from('Team').insert(team)
    if (error) {
        console.log(error)
        return null
    }
    return data
}
export const updateTeam = async (team: any) => {
    const { data, error } = await supabase.from('Team').update(team).eq('id', team.id)
    if (error) {
        console.log(error)
        return null
    }
    return data
}

export const deleteTeam = async (number: number) => {
    const { data, error } = await supabase.from('Team').delete().eq('number', number)
    if (error) {
        console.log(error)
        return null
    }
    return data
}

// Scores
export const getScores = async () => {
    const { data, error } = await supabase.from('Score').select('*')
    if (error) {
        console.log(error)
        return null
    }
    return data
}
export const getScore = async (id: number) => {
    const { data, error } = await supabase.from('Score').select('*').eq('id', id)
    if (error) {
        console.log(error)
        return null
    }
    return data
}
export const createScore = async (score: any) => {
    const { data, error } = await supabase.from('Score').insert(score)
    if (error) {
        console.log(error)
        return null
    }
    return (await getScores())?.find((a_score: any) => a_score.match_id === score.match_id && a_score.table === score.table)
}
export const updateScore = async (score: any) => {
    const { data, error } = await supabase.from('Score').update(score).eq('id', score.id)
    if (error) {
        console.log(error)
        return null
    }
    return data
}
export const deleteScore = async (id: number) => {
    const { data, error } = await supabase.from('Score').delete().eq('id', id)
    if (error) {
        console.log(error)
        return null
    }
    return data
}

//Matches
export const getMatches = async () => {
    const { data, error } = await supabase.from('Match').select('*')
    if (error) {
        console.log(error)
        return null
    }
    return data
}
export const getMatch = async (id: number) => {
    const { data, error } = await supabase.from('Match').select('*').eq('id', id)
    if (error) {
        console.log(error)
        return null
    }
    return data
}
export const createMatch = async (match: any) => {
    const { data, error } = await supabase.from('Match').insert(match)
    if (error) {
        console.log(error)
        return null
    }
    return (await getMatches())?.find((a_match: any) => a_match.event_id === match.event_id && a_match.time === match.time)
}

export const addMatchToEvent = async (match: any) => {
    let data = await createMatch(match);
    let event_data = await getEvent(match.event_id) as any;
    if (event_data !== null) {
        let event = event_data[0];
        event.schedule!.matches = [...event.schedule!.matches, data!.id];
        let other_data = await updateEvent(event);
        console.log(other_data)
    }
    return data
}

export const updateMatch = async (match: any) => {
    const { data, error } = await supabase.from('Match').update(match).eq('id', match.id)
    if (error) {
        console.log(error)
        return null
    }
    return data
}

export const deleteMatch = async (id: number) => {
    let match = (await getMatch(id))![0] as any;
    let score1_id = match.table1.score;
    let score2_id = match.table2.score;
    let score3_id = match.table3.score;
    let score4_id = match.table4.score;
    let score5_id = match.table5.score;
    let score6_id = match.table6.score;
    deleteScore(score1_id);
    deleteScore(score2_id);
    deleteScore(score3_id);
    deleteScore(score4_id);
    deleteScore(score5_id);
    deleteScore(score6_id);
    const { data, error } = await supabase.from('Match').delete().eq('id', id)
    if (error) {
        console.log(error)
        return null
    }
    return data
}