import { test, expect } from '@playwright/test'; //ESTA LINEA SIEMPRE, SIEMPRE, ABSOLUTAMENTE SIEMPRE DEBE IR
import { LoginPage } from './pageObjects/LoginPage';

//CASOS PARA INICIO DE SESION//

test('UI-021 Inicio de sesión credenciales validas', async ({ page }) => {
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/')
  
  const loginPage = new LoginPage(page)
  await loginPage.login('diana1@fake.com', 'myPassword')
  
  await expect(page.locator('//h1[normalize-space()=\'Contact List\']')).toBeVisible();
});



test('UI-022 Inicio de sesión con usuario incorrecto', async ({ page }) => {
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/')
  const loginPage = new LoginPage(page)
  await loginPage.login('diana123*@fake.com', 'myPassword')
  await expect(page.locator('//*[@id="error"]')).toBeVisible();
});


test('UI-023 Inicio de sesión con contraseña incorrecta', async ({ page }) => {
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/')
  
  const loginPage = new LoginPage(page)
  await loginPage.login('diana1@fake.com', 'myPassword*')

  await expect(page.locator('//*[@id="error"]')).toBeVisible();
});

test('UI-024 Inicio de sesión con credenciales invalidas', async ({ page }) => {
 await page.goto('https://thinking-tester-contact-list.herokuapp.com/')

 const loginPage = new LoginPage(page)
  await loginPage.login('diana155@fake.com', 'myPassword*')

 await expect(page.locator('//*[@id="error"]')).toBeVisible();
});


test('UI-025 Inicio de sesión con usuario vacio', async ({ page }) => {
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/')
  
  const loginPage = new LoginPage(page)
  await loginPage.login(' ', 'myPassword*')

  await expect(page.locator('//*[@id="error"]')).toBeVisible();
});

test('UI-026 Inicio de sesión con contraseña vacio', async ({ page }) => {
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/')
  
  const loginPage = new LoginPage(page)
  await loginPage.login('diana1@fake.com', '')

  await expect(page.locator('//*[@id="error"]')).toBeVisible();
});


test('UI-027 Inicio de sesión con credenciales vacias', async ({ page }) => {
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/')
  
  const loginPage = new LoginPage(page)
  await loginPage.login('', '')

  await expect(page.locator('//*[@id="error"]')).toBeVisible();
});