const {Todo} = require ('../models')
const Super = require('../helper/super.js')

class TodoController{
    
    static async getTodo(req, res){
        try {
            let data = await Todo.findAll({
                where: {UserId: req.key.id}
            })
            res.status(200).json(data)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async postTodo(req, res){
        try {
            let dataInput = req.body
            let validasiError = Super.validasiPutTodo(dataInput)
            if(validasiError.length>0){
                res.status(400).json(validasiError) 
            }else{
                dataInput.UserId = req.key.id
                let data = await Todo.create(dataInput)
                res.status(201).json(data)
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async getTodoById(req, res){
        try {
            let id = +req.params.id
            let data = await Todo.findByPk(id)
            res.status(200).json(data)
        } catch (err) {
            res.status(404).json(err)
        }
    }

    static async putTodo(req, res){
        try {
            let id = +req.params.id
            let dataInput = req.body
            
            let validasiError = Super.validasiPutTodo(dataInput)
            if(validasiError.length>0){
                res.status(400).json(validasiError)    
            }else{
                if(!dataInput.status){
                    dataInput.status = 'not done'
                }
                let data = await Todo.update(dataInput, {
                    where: {id}
                })
                res.status(200).json(dataInput)
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async patchTodo(req, res){
        try {
            let id = +req.params.id
            let dataInput = req.body.status
            let data = Todo.findByPk(id)
            data.status = dataInput
            Todo.update(data, {
                where: {id}
            })
            res.status(200).json(data)
        } catch (err) {
            res.status(500).json(err)
        }
    }
   
    static async deleteTodo(req, res){
        try {
            let id = +req.params.id
            let data = await Todo.destroy({
                where: {id}
            })
            if(data===0){
                let errMess = {
                    massage: 'Id Tidak ditemukan'
                }
                res.status(400).json(errMess)
            }else{
                let output = {
                    massage: 'todo succes to delete'
                }
                res.status(200).json(output)
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = TodoController