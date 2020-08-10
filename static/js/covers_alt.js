  function standby(that) {
        setTimeout(function () {

            console.log(that)

            let link = that.src;

            let id = link.split("/");
            id = id[id.length - 2];

            that.src = '/upload/' + id + '/cover.jpg';

        }, 2000)

    }
