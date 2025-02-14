const cluster = require('cluster')
const os = require('os')
const numCPUs = os.cpus().length
const logger = require('./logger')
const config = require("./config/service.config")
const LgoService = require('./LgoService')

if (cluster.isMaster) {
    logger.info(`Master process ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        logger.error(`Worker process ${worker.process.pid} died. Restarting...`)
        cluster.fork()
    })
} else {
    const lgoService = new LgoService(config.SERVICE_NAME)
    lgoService.start()
}
