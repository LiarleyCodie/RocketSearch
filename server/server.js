import express from 'express'
import cors from 'cors'
const app = express()

const port = 3333 || process.env.PORT

app.use(express.json())
app.use(cors())

import { router as apiRouter } from './server/routes/api.js'
app.use('/', apiRouter)

app.listen(port, () =>
  console.log(`Server running on https://localhost:${port}`)
)
