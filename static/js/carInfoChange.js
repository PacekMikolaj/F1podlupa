carInfoChange = (tab) =>
    tab.map(elem =>
        elem.split('|').map(e => {
            e = e.split(':');
            if (e.length > 1) e[0] += ':';
            return e;
        })
    );


module.exports = {
    carInfoChange
}