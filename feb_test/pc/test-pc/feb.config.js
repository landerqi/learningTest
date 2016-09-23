module.exports = {
    webpack: {
        externals: {
            'jquery': 'jQuery'
        },
        provide: {
            '$': 'jquery'
        }
    }

};
