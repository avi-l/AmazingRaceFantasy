import Round from './round'
import Team from '../models/Team'

export default function ContestantRoundList({
        perfectRoundScores,
        contestantRoundScores,
        perfectTeamList,
        contestantTeamList
    }: {
        perfectRoundScores: number[]
        contestantRoundScores: number[]
        perfectTeamList: Team[]
        contestantTeamList: Team[]
    }) {

    let grandTotal = 0
    let contestantGrandTotal = 0

    return (
        <div className="text-center">
            {perfectRoundScores.map((perfectScore, roundNumber) => {
                grandTotal += perfectScore
                let contestantRoundScore = contestantRoundScores[roundNumber]
                contestantGrandTotal += contestantRoundScore

                return <Round
                    key={"round"+roundNumber}
                    roundNumber={roundNumber}
                    perfectTeamList={perfectTeamList}
                    contestantTeamList={contestantTeamList}
                    perfectWeekScore={perfectScore}
                    contestantWeekScore={contestantRoundScore}
                    perfectGrandTotal={grandTotal}
                    contestantGrandTotal={contestantGrandTotal}
                />
            })}
        </div>
    )
}
