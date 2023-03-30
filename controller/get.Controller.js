const axios = require('axios');
const { response } = require('express');
const pool = require('../database/index');

const getContoller = {

    getAll: async (req,res) => {
        try{ 
            // url += "/books";
            var book_id = 0;
            const response = await axios.get("https://anapioficeandfire.com/api/books");
            const sql = "SELECT book_id FROM comments";
            const [result,fields] = await pool.query(sql)
            const books = response.data.map(book => {
                book_id += 1;
                let Count = 0;
                var num = book_id;
                for(const x of result){
                    if (num == x.book_id){
                        Count += 1
                        }             
                }
                return {
                    name:book.name,
                    authors:book.authors,
                    date: book.released,
                    id:book_id,
                    No_of_comments:Count,    
                }
            });
            res.json(books);    
        }
        catch (error){
            console.log(error)
            res.status(500).send("Server Error");
        }
    },

    getById: async (req,res) => {
        const bookId = req.params.id;
        try{
            const response = await axios.get(`https://anapioficeandfire.com/api/books/${bookId}`);
            const book = response.data
            res.json(book)
        }
        catch (error){
            console.log(error)
            res.status(500).send("Server Error");
        }
    },

    createComment: async (req,res)=> {
        const bookId = req.params.id;
        try{
            const {username,comment} = req.body
            const book_id = bookId
            const sql = "INSERT into comments (username, book_id, comment) VALUES (?, ?, ?)"
            const [rows,fields] = await pool.query(sql,[username, book_id, comment])
            res.json({
                data:rows
            })
        }
        catch (error){
            console.log(error)
            res.status(500).send("Server Error");
        }
    },

    getAnonComment: async (req, res)=> {
        const bookId = req.params.id;
        try{
            const sql = "SELECT comment,date FROM comments WHERE book_id = ? AND username = ? ORDER BY date DESC";
            const [rows,fields] = await pool.query(sql,[bookId,""])
            if (rows.length > 0){
                res.json({
                    data:rows
                })
            }
                res.json({
                    data:"Anonymous Comments not found !"
                })
        }
        catch (error){
            console.log(error)
            res.status(500).send("Server Error");
        }

    }

}

module.exports = getContoller