import { test, expect } from '@playwright/test';

test.describe('Тесты Главной страницы', () => {
  test.describe.configure({ timeout: 60000 });
  // запуск повторяющейся строчки кода для всех тестов в группе
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });)