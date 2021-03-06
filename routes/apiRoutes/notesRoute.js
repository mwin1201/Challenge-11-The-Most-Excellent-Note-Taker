const router = require("express").Router();
const notes = require('../../db/db.json');
const { writeFile, findNote } = require('../../lib/notes');

// get saved notes
router.get('/notes', (req, res) => {
    let response = notes;
    res.json(response);
});

// post note written by user
router.post('/notes', ({ body }, res) => {
    if (!body.title || !body.text) {
        res.sendStatus(404);
        return;
    }
    // give note unique ID
    body.id = Math.floor(Math.random() * 10000);
    let response = notes;
    response.push(body);
    writeFile(JSON.stringify(response));
    res.json({
        message: 'success',
        data: body
    });
});

// delete note with given id
router.delete('/notes/:id', (req, res) => {
    let id = req.params.id;
    let noteExist = findNote(notes, id);
    if (noteExist) {
        res.json({
            message: 'deleted',
            data: id
        });
    }
    else {
        res.json({
            message: 'no note found',
        });
    }
});



module.exports = router;