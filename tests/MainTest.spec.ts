import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';
import user from './user.json';

test.describe('Тесты Главной страницы', () => {
  test.describe.configure({ timeout: 100000 });

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  test('Вход, выход и повторный вход под другим пользователем', async ({ page }) => {
    const login = new LoginPage(page);

    // Вход под валидным пользователем
    await login.gotoLoginPage();
    await login.login(user.validUser.user, user.validUser.password);

    // Проверяем, что попали на страницу инвентаря
    await expect(page).toHaveURL(/\/inventory/);

    // Выход
    await login.logout();

    // Проверяем, что вернулись на страницу логина
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    // Вход под заблокированным пользователем
    await login.login(user.invalidUser.user, user.invalidUser.password);

    // Проверяем появление ошибки (пример)
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });
});
