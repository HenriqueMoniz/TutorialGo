import * as express from 'express'
import * as numbcon from 'number-converter'

class App {
  public express
  nc: any
  NumberConverter: any

  constructor () {
    this.express = express()
    this.mountRoutes()
    var NumberConverter = numbcon.NumberConverter;
    var nc = new NumberConverter(NumberConverter.DECIMAL, NumberConverter.ROMAN_NUMERAL);
  }

  private mountRoutes (): void {
    const router = express.Router()
    router.get('/', (req, res) => {
      res.json({
        message: this.nc.convert(1234)
      })
    })
    this.express.use('/', router)
  }
}
export default new App().express
