import { test, expect } from '@playwright/test';
import { CreateUserApi } from './PageObject/CreateUserApi';
import { request } from 'node:http';


test('API-011 Crear usuario con datos válidos', async ({ request }) => {

  //llamado al object
  const createUserApi = new CreateUserApi(request);

  //creacion de la constante en la data 
  const newUserRequest = {firstName: "Maria L", lastName: "Gomez", email: `maria${Date.now()}@fake.com`, password: "myPassword"}

  //Consumimos el servicio a traves del metodo post y enviamos la data por una constante 
  const newUserResponse = await createUserApi.createUser(newUserRequest.firstName,newUserRequest.lastName,  newUserRequest.email,  newUserRequest.password );
  
  //validar la respuesta del servicio 
  expect(newUserResponse.status()).toBe(201)  
 

  //acceder a un valor de la respuesta 
  const newUserJsonResponse = await newUserResponse.json()
  console.log("user",newUserJsonResponse.user)
  console.log("user firstName:", newUserJsonResponse.user.firstName)
  console.log("user lastName:", newUserJsonResponse.user.lastName)
  console.log('Token:',newUserJsonResponse.token)
  

  //token para las otras operaciones
  console.log("Token:", createUserApi.token)

})


test('API-012 Consultar usuario autenticado', async ({ request }) => {

  const userApi = new CreateUserApi(request);
  //creacion del usuario
  await userApi.createUser('Maria','Gomez',`maria${Date.now()}@fake.com`, 'myPassword');
  //consumo del metodo get
  const response = await userApi.getMe();
  //validacion del codigo de respuesta
  expect(response.status()).toBe(200);
  //
  const body = await response.json();
  console.log(body);
});

test('API-013 Validar la creacion de un usuario existente', async ({ request }) => {

    const createUserApi = new CreateUserApi(request);
    const newUserRequest = {firstName: "Maria",lastName: "Gomez",email: "Maria1@fake.com",password: "myPassword"};
    const newUserResponse = await createUserApi.createUser(newUserRequest.firstName, newUserRequest.lastName, newUserRequest.email, newUserRequest.password);
    
    console.log(JSON.stringify(await newUserResponse.json()))
    
    //validar la respuesta del servicio 
    expect(newUserResponse.status()).toBe(400)  

  }
)

test('API-014 Validar la actualizacion de un usuario', async({request})=> {

    const userApi = new CreateUserApi(request);
    //creacion del usuario
    await userApi.createUser('Tina','Enciso',`TINA${Date.now()}@fake.com`, 'myPassword');//cambiar el correo
    //validar el consumo del token
    console.log('TOKEN:', userApi.token);
    //consumo del metodo patch
    const response = await userApi.patchMe('Clara','Enciso Fuentes','tinaenciso1@fake.com','cv1247*');//cambiar el correo
    //validacion del codigo de respuesta
    expect(response.status()).toBe(200);
    //imprimir respuesta
    const body = await response.json();
    console.log(body);

  }
)


test('API-015 Validar la actualizacion del correo de un usuario', async({request})=> {

    const userApi = new CreateUserApi(request);
    //creacion del usuario
    await userApi.createUser('Mario','Garcia',`mario${Date.now()}@fake.com`, 'myPassword');//cambiar el correo
    //validar el token
    console.log('TOKEN:', userApi.token);
    //consumo del metodo patch
    const response = await userApi.patchMe('Mario','Garcia','Mario1234@fake.com','myPassword');//cambiar el correo
    //validacion del codigo de respuesta
    expect(response.status()).toBe(400);
    //imprimir respuesta
    const body = await response.json();
    console.log(body);

  }
)

test('API-016 Validar el correcto inicio de sesion de un usuario',async({request})=>{

    const userApi = new CreateUserApi(request);
    const response = await userApi.LogIn('diana123@fake.com','myPassword');
    
    expect(response.status()).toBe(200);

    //generacion del token
    console.log('TOKEN:', userApi.token);

    //imprimir respuesta
    const body = await response.json();
    console.log(body)

}
)

test('API-016 Validar el inicio de sesión campos vacios',async({request})=>{

    const userApi = new CreateUserApi(request);
    const response = await userApi.LogIn('','myPassword');
    
    expect(response.status()).toBe(401);

    //generacion del token
    console.log('TOKEN:', userApi.token);

  }
)


test('API-017 Validar el cierre de sesion de un usuario logeado',async({request})=>{

    const userApi = new CreateUserApi(request);
    const response = await userApi.LogIn('diana12@fake.com','myPassword');
    //generacion del token
    console.log('TOKEN:', userApi.token);
    
    //consumo del metodo post
    const responseLogOut = await userApi.LogOut();
    
    expect(responseLogOut.status()).toBe(200);

  }
)


test('API-018 Validar la eliminacion de un usuario',async({request})=>{

    const userApi = new CreateUserApi(request);
    const response = await userApi.LogIn('juanry@fake.com','myPassword');
    //generacion del token
    console.log('TOKEN:', userApi.token);
    
    //consumo del metodo delete
    const responseDeleteUser = await userApi.deleteUser();
    
    expect(responseDeleteUser.status()).toBe(200);

  }
)