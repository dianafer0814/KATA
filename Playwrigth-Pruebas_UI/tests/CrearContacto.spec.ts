import { test, expect } from '@playwright/test'; //ESTA LINEA SIEMPRE, SIEMPRE, ABSOLUTAMENTE SIEMPRE DEBE IR
import { LoginPage } from './pageObjects/LoginPage';
import { AddContactPage } from './pageObjects/AddContact';

//Crear un contacto 

test('UI-031 Creacion de un contacto', async ({ page }) => {
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/')
  
  const loginPage = new LoginPage(page)
  await loginPage.login('diana1@fake.com', 'myPassword')

  const AddContact = new AddContactPage(page)
  await AddContact.createContact('Marcela M','Posada','1975-08-10','3174037879','Av cali 13-85', 'Av Boyaca 15-18','Los amgeles','California','USA')
  
  await expect(page.locator("//h1[normalize-space()='Contact List']")).toBeVisible();

  await page.screenshot({path: 'screenshots/addContact031.png'})
});

test('UI-032 Creación de contacto con campos obligatorios vacíos', async ({ page }) => {
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/')
  
  const loginPage = new LoginPage(page)
  await loginPage.login('diana1@fake.com', 'myPassword')

  const AddContact = new AddContactPage(page)
  await AddContact.createContact('','Posada','1975-08-10','3174037879','Av cali 13-85', 'Av Boyaca 15-18','Los amgeles','California','USA')

  await expect(page.locator("//span[@id='error']")).toBeVisible();

  await page.screenshot({path: 'screenshots/addContact032.png'})
});

test('UI-033 Creación de contacto con datos inválidos', async ({ page }) => {
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/')
  
  const loginPage = new LoginPage(page)
  await loginPage.login('diana1@fake.com', 'myPassword')

  const AddContact = new AddContactPage(page)
  await AddContact.createContact('Camila','Herrera','1975-08-10f','3174037879','Av cali 13-85', 'Av Boyaca 15-18','Los amgeles','California','USA')

  await expect(page.locator("//span[@id='error']")).toBeVisible();

  await page.screenshot({path: 'screenshots/addContact033.png'})
});