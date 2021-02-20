import axios from 'axios';
import { NameApiService } from './../nameApiService';

jest.mock('axios')

test('nameApiService - 正常系', async () => {
  const nameApiService = new NameApiService();
  const response = {data: {first_name: 'yuki'}};
  jest.spyOn(axios, 'get').mockResolvedValue(response)
  expect(await nameApiService.getFirstName()).toBe('yuki')
})

test('nameApiService - 異常系', async () => {
  const nameApiService = new NameApiService();
  const response = {data: {first_name: 'yukiko'}};
  jest.spyOn(axios, 'get').mockResolvedValue(response)
  try {
    await nameApiService.getFirstName()
  } catch (error) {
    expect(error.message).toBe('firstName is too long!');
  }
})
