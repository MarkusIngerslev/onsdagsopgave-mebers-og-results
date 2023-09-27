function construct(resultData) {
    const result = {
        _date: resultData.date,
        _memberId: resultData.memberId,
        _discipline: resultData.discipline,
        _resultType: resultData.resultType,
        _time: resultData.time,
        getTime: function () {
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

    return result;
}

export { construct };
