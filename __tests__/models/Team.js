import Team from '../../app/models/Team'

describe('Team construct', () => {
    it('should construct', () => {
        const aTeam = new Team({
            teamName: "aTeamName"
        })

        expect(aTeam).not.toBeNull()
    })
})

describe('Team isInPlay', () => {
    it('should be true when elimination order is 0 reguardless of roundNumber (sparse)', () => {
        const aTeam = new Team({
            isParticipating: true,
            eliminationOrder: 0
        })

        // Assert, just check sections because otherwise it takes too long
        for (let i = Number.MAX_VALUE - 100; i < Number.MAX_VALUE; i++) {
            expect(aTeam.isInPlay(i)).toBeTruthy()
        }
        for (let i = Number.MIN_VALUE + 100; i > Number.MIN_VALUE; i--) {
            expect(aTeam.isInPlay(i)).toBeTruthy()
        }
        for (let i = 0 - 100; i < 100; i++) {
            expect(aTeam.isInPlay(i)).toBeTruthy()
        }
    })

    it('should be false if roundOrder and eliminationOrder are exactly the same', () => {

        for (let i = 0 - 100; i < 100; i++) {
            if (i === 0) { continue } // This was already coverd in the last test

            // Arrange
            const aTeam = new Team({
                eliminationOrder: i
            })

            // Act, Assert
            expect(aTeam.eliminationOrder).toBe(i)
            expect(aTeam.isInPlay(i)).toBeFalsy()
        }
    })

    // this is true because it assumes roundNumber is 0 indexed while
    // eliminationOrder is 1 indexed. This also leads to the next oddity which
    // is tested in the test w/ the same name but checking that the result is
    // falsy when the roundNumber is eliminationOrder-2
    it('should be false if roundOrder is one less than eliminationOrder', () => {

        for (let i = 0 - 100; i < 100; i++) {
            if (i === 0) { continue } // This was already coverd in the last test

            // Arrange
            const aTeam = new Team({
                eliminationOrder: i
            })

            // Act, Assert
            expect(aTeam.eliminationOrder).toBe(i)
            expect(aTeam.isInPlay(i-1)).toBeFalsy()
        }
    })

    // See comment on "should be false if roundOrder is one less...
    it('should be true if roundOrder is two less than eliminationOrder', () => {

        for (let i = 0 - 100; i < 100; i++) {
            if (i === 0) { continue } // This was already coverd in the last test

            // Arrange
            const aTeam = new Team({
                eliminationOrder: i
            })

            // Act, Assert
            expect(aTeam.eliminationOrder).toBe(i)
            expect(aTeam.isInPlay(i-2)).toBeTruthy()
        }
    })
})