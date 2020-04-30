const bookRoutes = (app, fs) => {

    // variabel file data buku
    const dataPath = './data/books.json';

    // refactored helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };



    // Read
    app.get('/books', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            res.send(JSON.parse(data));
        });
    });

    // Create
    app.post('/books', (req, res) => {

        readFile(data => {
                const newbookId = Object.keys(data).length + 1;

                // add the new book
                data[newbookId.toString()] = req.body;

                writeFile(JSON.stringify(data, null, 2), () => {
                    res.status(200).send('new book added');
                });
                res.end("Post Successfully: \n" + JSON.stringify(
                    data[newbookId],
                    null,
                    4
                ));
            },
            true);
    });

    // Update
    app.put('/books/:id', (req, res) => {

        readFile(data => {

                const bookId = req.params["id"];
                data[bookId] = req.body;

                writeFile(JSON.stringify(data, null, 2), () => {
                    res.status(200).send(`books id:${bookId} updated`);
                });
                res.end("Update Successfully: \n" + JSON.stringify(
                    data[bookId],
                    null,
                    4
                ));
            },
            true);
    });

    // Delete
    app.delete('/books/:id', (req, res) => {

        readFile(data => {


                const bookId = req.params["id"];
                delete data[bookId];

                writeFile(JSON.stringify(data, null, 2), () => {
                    res.status(200).send(`books id:${bookId} removed`);
                });
                res.end("Delete Successfully: \n" + JSON.stringify(
                    data,
                    null,
                    4
                ));
            },
            true);
    });

};

module.exports = bookRoutes;