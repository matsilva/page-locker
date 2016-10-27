function pageLocker(opts) {
    this.lockoutTime = opts.lockoutTime;
    this.redirectUrl = opts.redirectUrl;
    this.domain = opts.domain;

    //bypass
    if (document.location.href.indexOf('admin') !== -1) {
        return;
    }

    var pl = Cookies.getJSON('pagelocker');

    if (pl) {
        var now = new Date();
        var lockoutDate = new Date(parseInt(pl.lockoutDate));

        if (now.getTime() > lockoutDate.getTime()) {
            document.location.href = pl.redirectUrl;
        } else {
            // console.log("Has not been locked out");
            // console.log('lockoutDate', lockoutDate.getTime());
            // console.log('now', now.getTime());
        }

    } else {
        setTimeout(function () {

            var lockDate = new Date();
            lockDate.setMilliseconds(lockDate.getMilliseconds() + opts.lockoutTime);

            Cookies.set('pagelocker', {
                lockoutDate: lockDate.getTime(),
                redirectUrl: opts.redirectUrl || "/",
            }, {
                expires: 365,
                domain: opts.domain,
                path: opts.path,
            })
        }, opts.lockoutStartOffset || 0);
    }
}

pageLocker({
    lockoutTime: 1200000, //20 minutes
    lockoutStartOffset: 100000, // 1:30 minutes
    redirectUrl: "http://www.rendrfx.com/order-confirmation",
    domain: "rendrfx.com",
    // path: "/order-forms/annual-business-up-1"
    path: "/order-forms/annual-premium-up-1",
});
