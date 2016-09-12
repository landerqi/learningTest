var Test = {
    
    loop: function() {
        var loopStartTime = performance.now(),
            loopSpendTime,
            arr = [],
            loopEndTime = null;
        for (var i = 0; i < 10000; i++) {
            arr.push(i)
        };

        loopEndTime = performance.now();

        loopSpendTime = loopEndTime - loopStartTime;
        console.log(arr)
        console.log(loopSpendTime)
    }
}
module.exports = Test;
