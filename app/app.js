const byte = require("../app/src/index");
const {logger} = require("../app/src/utils/logger");
const { app } = new byte().init();
app.listen(process.env.PORT || 3000, () => logger.info("Server is running"));
