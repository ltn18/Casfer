class Perf {
    static benchmark = (callback) => {
        var before = Date.now();
        callback();
        var after = Date.now();
        return after - before;
    }
}

module.exports = Perf;