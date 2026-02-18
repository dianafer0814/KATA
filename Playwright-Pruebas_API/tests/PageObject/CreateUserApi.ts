import { APIRequestContext, APIResponse } from '@playwright/test';

export class CreateUserApi {

  private readonly request: APIRequestContext; //es el que contiene el llamado a los metodos
  private readonly baseUrl = 'https://thinking-tester-contact-list.herokuapp.com';

  public token!: string; //se usa para guardar el token

  constructor(request: APIRequestContext) {
    this.request = request;

  }

  async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<APIResponse> {

    const response = await this.request.post(`${this.baseUrl}/users`, {
      data: { firstName, lastName, email, password }
    });

    const body = await response.json();
    this.token = body.token;

    return response;

  }

  async getMe(): Promise<APIResponse> {
    return await this.request.get(`${this.baseUrl}/users/me`, {

      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });

  }

  async patchMe(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<APIResponse> {

    return this.request.patch(`${this.baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      },
      data: {
        firstName,
        lastName,
        email,
        password
      }
    });
  }

  async LogIn(email: string, password: string): Promise<APIResponse> {

    const response = await this.request.post(`${this.baseUrl}/users/login`, {
      data: { email, password }
    });

    const text = await response.text();

    if (text) {
      const body = JSON.parse(text);
      this.token = body.token;
    }

    return response;

  }

  async LogOut(): Promise<APIResponse> {

    return await this.request.post(`${this.baseUrl}/users/logout`, {

      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });

  }

  async deleteUser(): Promise<APIResponse> {

    return await this.request.delete(`${this.baseUrl}/users/me`, {

      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });

  }



}
