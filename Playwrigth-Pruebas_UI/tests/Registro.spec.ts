import { test, expect } from '@playwright/test'; //ESTA LINEA SIEMPRE, SIEMPRE, ABSOLUTAMENTE SIEMPRE DEBE IR
import { RegisterPage } from './pageObjects/RegistrationPage';
//Casos para el registro de un usuario//

test('UI-011 Registro exitoso con datos válidos', async ({ page }) => {
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
  
  const registerPage = new RegisterPage(page)
  await registerPage.registerUserPage('Silvana Maria', 'Andrade', 'andradeSm8@fake.com', 'fre1287');

  await expect(page.locator('//h1[normalize-space()=\'Contact List\']')).toBeVisible();
});

test('UI-012 Registro con nombre vacío ', async ({ page }) => {
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
 
  const registerPage = new RegisterPage(page)
  await registerPage.registerUserPage('', 'Andrade', 'andrade12@fake.com', 'fre1287');

  await expect(page.locator("//span[@id='error']")).toBeVisible();
});

test('UI-013 Registro con email inválido ', async ({ page }) => {
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
  
  const registerPage = new RegisterPage(page)
  await registerPage.registerUserPage('Andrea', 'Andrade', 'andrade12', 'fre1287');

  await expect(page.locator("//span[@id='error']")).toBeVisible();
});

test('UI-014 Registro con un correo electrónico ya registrado', async ({ page }) => {
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');

  const registerPage = new RegisterPage(page)
  await registerPage.registerUserPage('Silvana Maria', 'Andrade', 'andrade12@fake.com', 'fre1287');

  await expect(page.locator("//span[@id='error']")).toBeVisible();
});