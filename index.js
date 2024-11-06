const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

app.use(bodyParser.json());
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
require("chromedriver");

async function selenium(
  firstName,
  lastName,
  email,
  gender,
  mobile,
  date,
  subject,
  hobbies,
  address,
  state,
  city
) {
  const chromeOptions = new chrome.Options();
  chromeOptions.addArguments("--no-sandbox");
  chromeOptions.addArguments("--disable-dev-shm-usage");
  chromeOptions.addArguments("--disable-gpu");
  chromeOptions.addArguments("--window-size=1920x1080");
  chromeOptions.addArguments("--enable-unsafe-swiftshader");

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();

  try {
    await driver.manage().window().maximize();
    await driver.get("https://demoqa.com/automation-practice-form");
    await driver.navigate().refresh();
    await driver.sleep(3000);
    await driver.executeScript(
      "document.querySelectorAll('iframe').forEach(iframe => iframe.style.display='none');"
    );

    const firstNameInputSelector = By.id("firstName");
    await driver.wait(until.elementLocated(firstNameInputSelector), 1000);
    let firstNameInputElement = await driver.findElement(
      firstNameInputSelector
    );
    await firstNameInputElement.sendKeys(firstName);

    const lastNameInputSelector = By.id("lastName");
    await driver.wait(until.elementLocated(lastNameInputSelector), 1000);
    let lastNameInputElement = await driver.findElement(lastNameInputSelector);
    await lastNameInputElement.sendKeys(lastName);

    const emailInputSelector = By.id("userEmail");
    await driver.wait(until.elementLocated(emailInputSelector), 1000);
    let emailInputElement = await driver.findElement(emailInputSelector);
    await emailInputElement.sendKeys(email);

    switch (gender) {
      case "Male":
        const maleGenderInputSelector = By.xpath(
          "/html/body/div[2]/div/div/div/div[2]/div[2]/form/div[3]/div[2]/div[1]/label"
        );
        await driver.wait(until.elementLocated(maleGenderInputSelector), 1000);
        let maleGenderInputElement = await driver.findElement(
          maleGenderInputSelector
        );
        await maleGenderInputElement.click();
        break;
      case "Female":
        const femaleGenderInputSelector = By.xpath(
          "/html/body/div[2]/div/div/div/div[2]/div[2]/form/div[3]/div[2]/div[2]/label"
        );
        await driver.wait(
          until.elementLocated(femaleGenderInputSelector),
          1000
        );
        let femaleGenderInputElement = await driver.findElement(
          femaleGenderInputSelector
        );
        await femaleGenderInputElement.click();
        break;
      case "Other":
        const otherGenderInputSelector = By.xpath(
          "/html/body/div[2]/div/div/div/div[2]/div[2]/form/div[3]/div[2]/div[3]/label"
        );
        await driver.wait(until.elementLocated(otherGenderInputSelector), 1000);
        let otherGenderInputElement = await driver.findElement(
          otherGenderInputSelector
        );
        await otherGenderInputElement.click();
        break;
      default:
        break;
    }

    const mobileInputSelector = By.id("userNumber");
    await driver.wait(until.elementLocated(mobileInputSelector), 1000);
    let mobileInputElement = await driver.findElement(mobileInputSelector);
    await mobileInputElement.sendKeys(mobile);

    const dateInputSelector = By.id("dateOfBirthInput");
    await driver.wait(until.elementLocated(dateInputSelector), 1000);
    let dateInputElement = await driver.findElement(dateInputSelector);
    await driver.executeScript(
      `arguments[0].value = '${date}';`,
      dateInputElement
    );

    const subjectInputSelector = By.id("subjectsInput");
    await driver.wait(until.elementLocated(subjectInputSelector), 1000);
    let subjectInputElement = await driver.findElement(subjectInputSelector);
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      subjectInputElement
    );
    await driver.executeScript("arguments[0].click();", subjectInputElement);
    await subjectInputElement.sendKeys(subject);
    await driver.wait(
      until.elementLocated(By.css(".subjects-auto-complete__option")),
      50
    );
    const firstOption = await driver.findElement(
      By.css(".subjects-auto-complete__option")
    );
    await firstOption.click();

    for (const element of hobbies) {
      switch (element) {
        case "Sports":
          await driver
            .findElement(By.xpath("/html/body/div[2]/div/div/div/div[2]/div[2]/form/div[7]/div[2]/div[1]/label"))
            .click();
          break;
        case "Reading":
          await driver
            .findElement(By.xpath("/html/body/div[2]/div/div/div/div[2]/div[2]/form/div[7]/div[2]/div[2]/label"))
            .click();
          break;
        case "Music":
          await driver
            .findElement(By.xpath("/html/body/div[2]/div/div/div/div[2]/div[2]/form/div[7]/div[2]/div[3]/label"))
            .click();
          break;
        default:
          break;
      }
    }    

    const addressInputSelector = By.id("currentAddress");
    await driver.wait(until.elementLocated(addressInputSelector), 100);
    let addressInputElement = await driver.findElement(addressInputSelector);
    await addressInputElement.sendKeys(address);

    const stateDropdown = await driver.findElement(By.id("state"));
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      stateDropdown
    );
    await stateDropdown.click();
    const stateOption = await driver.findElement(
      By.xpath(`//div[@id='state']//div[contains(text(), '${state}')]`)
    );
    await stateOption.click();

    const cityDropdown = await driver.findElement(By.id("city"));
    await cityDropdown.click();
    const cityOption = await driver.findElement(
      By.xpath(`//div[@id='city']//div[contains(text(), '${city}')]`)
    );
    await cityOption.click();

    const submitButton = await driver.findElement(By.id("submit"));
    await submitButton.click();

    await driver.sleep(5000);
    console.log("Arama başarılı!");
  } catch (error) {
    console.error("Bir hata oluştu: ", error);
  } finally {
    await driver.quit();
  }
}

app.post("/", (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      gender,
      mobile,
      date,
      subject,
      hobbies,
      address,
      state,
      city,
    } = req.body;

    const missingFields = [];

    if (!firstName) missingFields.push("firstName");
    if (!lastName) missingFields.push("lastName");
    if (!email) missingFields.push("email");
    if (!gender) missingFields.push("gender");
    if (!mobile) missingFields.push("mobile");
    if (!date) missingFields.push("date");
    if (!subject) missingFields.push("subject");
    if (!hobbies) missingFields.push("hobbies");
    if (!address) missingFields.push("address");
    if (!state) missingFields.push("state");
    if (!city) missingFields.push("city");

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Zorunlu alanlar eksik: ${missingFields.join(", ")}`
      });
    }

    selenium(
      firstName,
      lastName,
      email,
      gender,
      mobile,
      date,
      subject,
      hobbies,
      address,
      state,
      city
    );
    res.status(201).json("başarılı");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`API http://localhost:${port} üzerinde çalışıyor.`);
});