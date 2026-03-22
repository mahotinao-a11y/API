export class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = '#user-name';
    this.password = '#password';
    this.loginButton = '.submit-button.btn_action';
    this.logoutMenuButton = '#react-burger-menu-btn'; // кнопка меню (для выхода)
    this.logoutLink = '#logout_sidebar_link'; // кнопка меню (для входа)
  }
  async gotoLoginPage() {
    await this.page.goto('https://www.saucedemo.com');
  }
  async login(user: string, password: string) {
    await this.page.locator(this.username).fill(user);
    await this.page.locator(this.password).fill(password);
    await this.page.locator(this.loginButton).click();
  }
  async logout() {
    // Нажать на кнопку меню
    await this.page.locator(this.logoutMenuButton).click();
    // Подождать появления кнопки выхода и нажать ее
    await this.page.locator(this.logoutLink).click();
  }
}
