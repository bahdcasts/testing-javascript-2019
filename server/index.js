import Chalk from 'chalk'
import config from '@config'
import app from '@server/app'

app.listen(config.port, () => {
    console.log(`
        ${Chalk.blue(`💚   Project running on http://localhost:${config.port}`)}
  `)
})
