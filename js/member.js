function construct(memberData) {
    const member = {
        _name: memberData.firstName + " " + memberData.lastName,
        _active: memberData.isActiveMember,
        _birthday: memberData.dateOfBirth,
        _id: memberData.id,
        getAge() {
            // find dato i dag og personens fødselsdag
            const today = new Date();
            const birthDate = new Date(memberData.dateOfBirth);

            // find alder ved at trække fødsels år fra nuværende år
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDifference = today.getMonth() - birthDate.getMonth();

            // tjekker om den aktuelle fødselsmåned allerede har været.
            // hvis fødselsdagen ikke har været indnu, så vil der blive trukket 1 fra personens alder.
            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            return age;
        },
        isJunior() {
            if (this.getAge() < 18) {
                return true;
            }
            return false;
        },
        getJuniorSeniorStatus() {
            if (this.isJunior() === true) {
                return "Junior";
            } else {
                return "Senior";
            }
        },
    };

    return member;
}

export { construct };
