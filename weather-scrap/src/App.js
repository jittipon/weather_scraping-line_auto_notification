import logo from "./logo.svg";
import "./App.css";

function App() {

  // const puppeteer = require('puppeteer')

  // async function scrape() {
  //   const browser = await puppeteer.launch({})
  //   const page = await browser.newPage()

  //   await page.goto('https://www.thesaurus.com/browse/smart')
  //   var element = await page.waitFor("#meanings > div.css-ixatld.e15rdun50 > ul > li:nth-child(1) > a")
  //   var text = await page.evaluate(element => element.textContent, element)
  //   console.log(text)
  //   browser.close()
  // }


  // useEffect(() => {

  //   scrape();

  // }, []);


  return (
    <div className="App">
      <header className="App-header">
        <button>CLICK GU !</button>
      </header>
    </div>
  );
}

export default App;
