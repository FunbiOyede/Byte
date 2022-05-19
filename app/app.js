const byte = require("../app/src/index");
const {logger} = require("../app/src/utils/logger");
const { app } = new byte().init();

let port = process.env.PORT || 3000
app.listen(port, () => logger.info("Server is running"));
