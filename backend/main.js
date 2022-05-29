const express = require('express');
const { Sequelize, DataTypes} = require('sequelize');

const app = express();

const sequelize = new Sequelize({
    database: 'todo_db',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    storage: 'todo_db.db'
})

const List = sequelize.define('list', {
    title: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

sequelize.sync();

app.put('/add/:title', async (req, res) => {
    const add = await List.create({
        title: req.params.title,
        description: req.query.desc
    })
    if(!add) return res.send('Cannot add file!');

    res.send(add);
});

app.delete('/remove/:id', async (req, res) => {
    const toRemove = await List.findByPk(req.params.id);
    if(!toRemove) return res.send('Element does not exist!');

    try {
        toRemove.destroy();
    } catch (err) {
        console.error(err);
        return res.send('Something went wrong! Check console!');
    } finally {
        res.send('Removed!');
    }
})

app.post('/update/:id', async (req, res) => {
    const toUpdate = await List.findByPk(req.params.id);
    if(!toUpdate) return res.send('Element does not exist!');

    try {
        toUpdate.done = true;
        await toUpdate.save();
    } catch (err) {
        console.error(err);
        return res.send('Something went wrong! Check console!');
    } finally {
        res.send('Updated!');
    }
})

app.get('/list', async (req, res) => {
    const list = await List.findAll();
    res.json(list.map(row => ({id: row.id, title: row.title, description: row.description, done: row.done, created: row.createdAt, changed: row.updatedAt})))
})

module.exports = app;