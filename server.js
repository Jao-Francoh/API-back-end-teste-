import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

const users = []

app.post('/usuarios', async (req, res) => { //rota para criar usuarios dentro da variavel//

    await prisma.user.create({ 
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
        }

    })

    res.status(201).json(req.body) 
})

app.get('/usuarios', async (req, res) => { //rota para responder o json com todos os usuarios//

   if(req.query){
    users = await prisma.user.findMany({
       where: {
          name: req.query.name,
          email: req.query.email,
          age: req.query.age
       }
    })
   } else {
    users = await prisma.user.findMany()
   }

   const users = await prisma.user.findMany()

    res.status(200).json(users)
})

app.listen(3000)

app.put('/usuarios/:id', async (req, res) => { //rota para editar usuarios dentro da variavel//

    console.log(req)
     await prisma.user.update({ 
        where: {
             id: req.params.id
        },
        data: {
           email: req.body.email,
            name: req.body.name,
            age: req.body.age,
        }
    })

    res.status(201).json(req.body) 
})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
       where: { 
          id:req.params.id
       }
    })

    res.status(200).json({message: 'Usuário deletado com sucesso!'})
})

/*
        1) tipo de rota / metodo http
        2) endereço
*/
