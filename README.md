# Automation Practice Form Bot (Express & Selenium)

This project is a form-filling bot using **Express.js** and **Selenium**. It accepts user data via a POST API endpoint and automatically fills in the form fields on a demo website using **Selenium** automation. The code runs on **Node.js** and interacts with **Chrome WebDriver**.

## Features

- **Express.js API**: Receives and validates form data through an API endpoint.
- **Selenium Automation**: Automates the process of filling out a demo form with received data.
- **Robust Data Validation**: Ensures required fields are provided and sends feedback if any are missing.
- **Chrome WebDriver**: Uses Chrome for form automation with configurable options (e.g., `--no-sandbox`).

## Usage

1. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/yourusername/automation-practice-form-bot.git
   cd automation-practice-form-bot
   npm install
