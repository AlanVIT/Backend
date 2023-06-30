import { Router } from "express";
import studentModel from "../model/students.js";

const router = Router()

router.get('/', async (req, res) =>{

    const students = await studentModel.find()
    res.send({students})

})
router.get('/sid', async(req, res)=>{
    const id = req.params.sid
    const student = await studentModel.findOne({_id:id})
    res.send({student})
})

router.delete('/:sid', async (req, res)=>{

    const id = req.params.sid
    const result = await studentModel.deleteOne({_id:id})
    res.send({result})
})

res.post('/', async (res, req)=>{

    const {nombre, apellido, edad, dni, curso, nota} = req.body
    if(!nombre|| !apellido|| !edad|| !dni|| !curso|| !nota){
        return res.status(404).send({error:"Faltan datos"})
    }

    const user ={
        nombre, apellido, edad, dni, curso, nota
    }

    const result = await studentModel.create(user)
    res.send(result)
})
router.put('/:sid', async (req,res)=>{
    const id = req.params.sid;
    const {nombre, apellido, edad,dni,curso,nota} = req.body;
    if(!nombre || !apellido || !edad || !dni || !curso || !nota){
        return res.status(400).send({error:"Datos incompletos"})
    }
    const newUser = {
        nombre, apellido, edad, dni, curso, nota
    }
    const result = await studentModel.updateOne({_id:id},{$set:newUser})

    res.send({result})

})
router.get('/tenStudents', async (req, res)=>{
    const students = [{
        "nombre": "Steffen",
        "apellido": "Terzo",
        "edad": 36,
        "dni":"0115691240",
        "curso":"Programación Backend",
        "nota":9
      }, {
        "nombre": "Jorgan",
        "apellido": "Matthis",
        "edad": 27,
        "dni":"029358120",
        "curso":"Programación Frontend",
        "nota":6
      }, {
        "nombre": "Haley",
        "apellido": "Proback",
        "edad": 34,
        "dni":"51241268",
        "curso":"Diseño UX/UI",
        "nota":7
      }, {
        "nombre": "Michelina",
        "apellido": "Beaglehole",
        "edad": 34,
        "dni":"24614567",
        "curso":"Diseño UX/UI",
        "nota":6
      }, {
        "nombre": "Jeralee",
        "apellido": "Postans",
        "edad": 26,
        "dni":"97212450",
        "curso":"Programación Frontend",
        "nota":6
      }, {
        "nombre": "Jordain",
        "apellido": "Kerner",
        "edad": 35,
        "dni":"41262234",
        "curso":"Programación Backend",
        "nota":5
      }, {
        "nombre": "Harriett",
        "apellido": "Skeene",
        "edad": 33,
        "dni":"21245129",
        "curso":"Programación Backend",
        "nota":10
      }, {
        "nombre": "Andie",
        "apellido": "McIlrath",
        "edad": 20,
        "dni":"59127389",
        "curso":"Programación Frontend",
        "nota":9
      }, {
        "nombre": "Sapphira",
        "apellido": "Arnholtz",
        "edad": 17,
        "dni":"03128893",
        "curso":"Programación Backend",
        "nota":5
      }, {
        "nombre": "Terra",
        "apellido": "Wadsworth",
        "edad": 31,
        "dni":"002213850",
        "curso":"Diseño UX/UI",
        "nota":10
      }]

      res.send({students})
})

export default router;