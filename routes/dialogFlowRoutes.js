const dialogflow = require("dialogflow");
const { query, request } = require("express");
const config = require("../config/keys");
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(
  config.googleProjectId,
  config.dialogFlowSessionID
);

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send({ hello: "chatbot" });
  });

  app.post("/api/df_text_query", async (req, res) => {
    try {
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: req.body.text,
            languageCode: config.dialogFlowSessionLanguageCode,
          },
        },
      };
      let responses = await sessionClient.detectIntent(request);

      res.send(responses[0].queryResult);
    } catch (error) {
      console.log(error);
    }
  });

  app.post("/api/df_event_query", (req, res) => {
    res.send({ do: "event query" });
  });
};
