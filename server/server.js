import express from 'express'
import cors from 'cors'
import { getLinkPreview } from "link-preview-js";

const server = express()
server.use(express.json())
server.use(cors())

server.get('/', (req, res) => {
    if(!req.query.link) {
        res.status(404)
        res.send('No url')
    } else {
        try {
            // getLinkPreview(req.query.link).then((data) => {
            getLinkPreview('https://www.youtube.com/watch?v=EOAPMhaCtuw').then((data) => {
                res.json(data)
            })
        } catch(err) {
            console.log(err)
            res.status(500)
            res.send('Error')
        }
    }
})

const PORT = 3006
server.listen(PORT, () => console.log(`Server is running at: ${PORT}`))