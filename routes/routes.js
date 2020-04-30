// memuat route untuk books
const bookRoutes = require('./books');

const appRouter = (app, fs) => {
    // menampilkan pesan untuk route kosong
    app.get('/', (req, res) => {
        res.send('welcome to the development ayu book api-server');
    });

    // menjalankan book route
    bookRoutes(app, fs);
};

module.exports = appRouter;