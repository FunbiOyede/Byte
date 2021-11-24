const byte = require("../app/src/index");

const { app } = new byte().init();
app.listen(process.env.PORT || 3000, () => console.log("server running"));
