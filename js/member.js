function construct(memberData) {
    const member = {
        _name: memberData.firstName + " " + memberData.lastName,
        _active: memberData.isActiveMember,
        _birthday: memberData.dateOfBirth,
        _id: memberData.id,
        _image: memberData.image,
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
        get isJunior() {
            return this.getAge() < 18;
        },
        get isSenior() {
            return !this.isJunior;
        },
        getJuniorSeniorStatus() {
            if (this.isJunior) {
                return "Junior";
            } else if (this.isSenior) {
                return "Senior";
            }
        },
    };

    // Gør id skrivebeskyttet
    Object.defineProperty(member, "_id", {
        writable: false,
    });

    // Gør name og image ikke-enumerable
    Object.defineProperties(member, {
        _name: {
            enumerable: false,
        },
        _image: {
            enumerable: false,
        },
    });

    return member;
}

export { construct };
