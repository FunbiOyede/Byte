const cors = require("cors");
const express = require("express");
const BodyParser = require("body-parser");

class Byte {
  constructor() {
    this.app = express();
    this.configure();
  }
  /**
   * loaders
   */
  configure() {
    this.app.use(cors());
    this.app.use(BodyParser.json());
    this.app.use(BodyParser.urlencoded({ extended: true }));
    this.app.get("/status", async (req, res) => {
      res.status(200).json({ message: "Ready!, Up and running" });
    });
  }

  init() {
    return this;
  }
}

module.exports = Byte;
