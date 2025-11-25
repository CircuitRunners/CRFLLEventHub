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
    return data
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
    const { data, error } = await supabase.from('Match').delete().eq('id', id)
    if (error) {
        console.log(error)
        return null
    }
    return data
}