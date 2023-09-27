import { findMembersResults } from "./script.js";

function construct(resultData) {
    const memberName = findMembersResults(resultData.memberId);

    const result = {
        _date: resultData.date,
        _discipline: resultData.discipline,
        _resultType: resultData.resultType,
        _time: resultData.time,
        get member() {
            return {
                _id: resultData.memberId,
                _name: memberName,
            };
        },
        getTime() {
            const timeParts = resultData.time.split(":");
            const minutes = parseInt(timeParts[0]);
            const secondsAndHundredths = timeParts[1].split(".");
            const seconds = parseInt(secondsAndHundredths[0]);
            const hundredths = parseInt(secondsAndHundredths[1]);

            // Beregn totaltiden i millisekunder
            const totalTimeInMilliseconds = minutes * 60 * 1000 + seconds * 1000 + hundredths * 10;

            return totalTimeInMilliseconds;
        },
    };

    // Gør id skrivebeskyttet
    Object.defineProperty(result, "_id", {
        writable: false,
    });

    // Gør metoderne og member ikke-enumerable
    Object.defineProperties(result, {
        getTime: {
            enumerable: false,
        },
        member: {
            enumerable: false,
        },
    });

    return result;
}

export { construct };
