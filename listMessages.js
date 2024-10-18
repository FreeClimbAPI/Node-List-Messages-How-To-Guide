require('dotenv').config()
const freeclimbSDK = require('@freeclimb/sdk')

const accountId = process.env.ACCOUNT_ID
const apiKey = process.env.API_KEY
const configuration = freeclimbSDK.createConfiguration({ accountId, apiKey })
const freeclimb = new freeclimbSDK.DefaultApi(configuration)

getMessages().then(messages => {
  console.log('got messages', messages)
}).catch(err => {
  console.log(err)
})

async function getMessages() {
  const messages = []

  let response = await freeclimb.listSmsMessages()
  messages.push(...response.messages)

  while (response.nextPageUri) {
    response = await freeclimb.getNextPage(response)
    messages.push(...response.messages)
  }
  return messages
}