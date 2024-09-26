const LLM_API_URL = process.env.LLM_CLASS2;
const axios = require("axios");

async function claude3haiku(request, response) {
  const requestOptions = {
    method: "post",
    url: LLM_API_URL,
    data: request.body,
    headers: {
      "Content-Type": "application/json",
    },
  };

  let responseText;
  // Send POST request to API, get response and set the reponse as paragraph element text
  try {
    responseText = await axios(requestOptions);
  } catch (error) {
    return response.status(511).send(`Gen AI claude3haiku: ${error.message}`);
  }

  return response.status(200).json(responseText.data);
}

module.exports = claude3haiku;
