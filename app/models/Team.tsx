import { ITeam } from '../utils/wikiQuery'

export default class Team {
    teamName: string
    relationship: string
    isParticipating: boolean
    eliminationOrder: number

    constructor(inTeam: ITeam) {

        if ((inTeam.eliminationOrder === 0 && !inTeam.isParticipating) ||
            (inTeam.eliminationOrder !== 0 && inTeam.isParticipating)) {
            console.warn("Building a team with teamName: '" + inTeam.teamName + "'whose eliminationOrder is 0 (default), but they are also have isParticipating = false. May be a bad team construction")
        }

        this.teamName = inTeam.teamName
        this.relationship = inTeam.relationship
        this.isParticipating = inTeam.isParticipating
        this.eliminationOrder = inTeam.eliminationOrder
    }

    isInPlay(roundNumber: number): boolean {
        
        const currentWeek = roundNumber+1
        const teamIsParticipating = this.isParticipating
        const teamHasNotYetBeenEliminated = this.eliminationOrder > currentWeek

        return teamIsParticipating || teamHasNotYetBeenEliminated
    }

    static getKey(teamName: string): string {
        var seed = ""

        const names = teamName
            .split("&")
            .map(s => s.trim() )

        if (names[0][0] > names[1][0]) {
            seed = names[1] + names[0]
        }
        else {
            seed = names[0] + names[1]
        }
        return seed
    }
}

