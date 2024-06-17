import * as cheerio from 'cheerio'
import twilio from 'twilio'
import * as xlsx from 'xlsx'

const client = twilio(Bun.env.TWILIO_ACCOUNT_SID, Bun.env.TWILIO_AUTH_TOKEN)

const bootstrap = async () => {
  try {
    const res = await fetch(Bun.env.PAGE_SCRAPING_URL)
    const data = await res.text()
    const $ = cheerio.load(data)

    const elements = $(
      Bun.env.CHEERIO_HTML_SELECTOR
    ) as cheerio.Cheerio<cheerio.Element>

    if (elements.length === 0) {
      throw new Error('No elements found')
    }

    const elementRef = elements.get(0)

    const fileURI = elementRef?.attribs.href

    if (!fileURI) {
      throw new Error('No file found')
    }

    const fileRes = await fetch(fileURI).then((res) => res.arrayBuffer())

    const workbook = xlsx.read(new Uint8Array(fileRes), {
      type: 'array',
    })
    const sheet_name_list = workbook.SheetNames
    const xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

    const values = xlData
      .map((row: any) => {
        return Object.values(row)
      })
      .flat()
      .filter((value: any) =>
        new RegExp(/^[0-9]{1,10}-[0-9]{1,10}$/).test(value)
      )
      .sort()

    if (values.find((value: any) => value === '8020-2020')) {
      console.log('Found')
      client.messages
        .create({
          body: 'Arrive document 8020-2020',
          from: Bun.env.TWILIO_PHONE_NUMBER,
          to: '',
        })
        .then((message) => console.log(message.sid))

      // .done()
    } else {
      client.messages
        .create({
          body: 'Not Found',
          from: Bun.env.TWILIO_PHONE_NUMBER,
          to: '',
        })
        .then((message) => console.log(message.sid))
      console.log('Not Found')
    }

    // console.log(values)
    // console.log(workbook.Sheets)
  } catch (err) {
    console.error(err)
  }
}

bootstrap()
