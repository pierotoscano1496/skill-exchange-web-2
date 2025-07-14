import { test, expect } from '@playwright/test';

test.describe('User Registration Flow', () => {
  test('should allow a user to register successfully', async ({ page }) => {
    // Navigate to the first step of registration to set local storage
    await page.goto('http://localhost:3000/register/step-1');
    await page.evaluate(() => {
      const data = {
        documentType: 'dni',
        documentNumber: '12345678',
        firstName: 'Test',
        lastName: 'User',
        fechaNacimiento: '1990-01-15',
        description: 'This is a test user for automated testing purposes.',
      };
      localStorage.setItem('registrationData', JSON.stringify(data));
    });

    const uniqueEmail = `testuser_${Date.now()}@example.com`;

    // Step 2: Fill in credentials and account type
    await page.goto('http://localhost:3000/register/step-2');
    await page.getByLabel('Correo electrónico').fill(uniqueEmail);
    await page.getByLabel('Contraseña', { exact: true }).fill('Password123!');
    await page.getByLabel('Confirmar contraseña').fill('Password123!');
    await page.getByLabel('Soy Cliente (Quiero contratar servicios)').check();
    await page.getByRole('button', { name: 'Siguiente' }).click();

    // Step 3: Fill in social media profiles
    await expect(page).toHaveURL('http://localhost:3000/register/step-3');
    await page.getByPlaceholder('URL de LinkedIn').fill('https://www.linkedin.com/in/testuser');
    await page.getByRole('button', { name: 'Finalizar registro' }).click();

    // Assert that the success message is shown and then redirected
    await expect(page.getByText('¡Registro completado!')).toBeVisible();
    
    // Wait for redirection to the login page
    await page.waitForURL('http://localhost:3000/login', { timeout: 5000 });
    await expect(page).toHaveURL('http://localhost:3000/login');
  });
});