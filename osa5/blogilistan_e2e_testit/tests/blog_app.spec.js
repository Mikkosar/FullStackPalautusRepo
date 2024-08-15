const { test, expect, beforeEach, describe } = require('@playwright/test');
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http:localhost:3001/api/testing/reset');
        await request.post('http://localhost:3001/api/users', {
            data: {
                name: 'testuser',
                username: 'user',
                password: 'salainen'
              }
        });

        await page.goto('http://localhost:5173')

    });

    test('Login form is shown', async ({ page }) => {
        await expect(await page.getByTestId('loginTitle')).toBeVisible();
        await expect(await page.getByTestId('username')).toBeVisible();
        await expect(await page.getByTestId('password')).toBeVisible();
    });

    
    describe('Login', () => {
        
        test('Succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'user', 'salainen');
            await expect(page.getByTestId('currentuser')).toBeVisible();
        });

        test('Fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'user', 'wrong');

            const logginErrorDiv = await page.locator('.errorNotification')
            await expect(logginErrorDiv).toContainText('invalid username or password')
        });

    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'user', 'salainen');
        });

        test('A new blog can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'Create new Blog' }).click();
            await createBlog(page, 'playwright blog', 'playwrighter', 'www.playwrtierblog.com'); 
            
            const succesDiv = await page.locator('.notification');
            await expect(succesDiv).toContainText('blog added successfully');
            await expect(page.getByText('playwright blog')).toBeVisible();
        });

        test('Blog can be liked', async ({ page }) => {
            await page.getByRole('button', { name: 'Create new Blog' }).click();
            await createBlog(page, 'playwright blog', 'playwrighter', 'www.playwrtierblog.com'); 

            await page.getByRole('button', { name: 'view' }).click();
            await page.getByRole('button', { name: 'Like' }).click();

            const succesDiv = await page.locator('.notification')
            await expect(succesDiv).toContainText('blog liked')
        });

        test('Removed button is visible', async ({ page }) => {
            await page.getByRole('button', { name: 'Create new Blog' }).click();
            await createBlog(page, 'playwright blog', 'playwrighter', 'www.playwrtierblog.com'); 
            await page.getByRole('button', { name: 'view' }).click();

            await expect(page.getByRole('button', { name: 'remove' })).toBeVisible();
        });

        test('Blog can be deleted', async ({ page }) => {
            await page.getByRole('button', { name: 'Create new Blog' }).click();
            await createBlog(page, 'playwright blog', 'playwrighter', 'www.playwrtierblog.com'); 
            await page.getByRole('button', { name: 'view' }).click();

            page.on('dialog', async dialog => {
                await dialog.accept();
            });

            await page.getByRole('button', { name: 'remove' }).click();

            const succesDiv = await page.locator('.notification')
            await expect(succesDiv).toContainText('blog was removed successfully');
            await expect(page.getByText('playwright blog')).not.toBeVisible();
        });

        test('Blogs are sorted by likes', async ({ page }) => {
            await page.getByRole('button', { name: 'Create new Blog' }).click();
            await createBlog(page, 'playwright blog one', 'playwrighterone', 'www.playwrtierblogone.com');
            await createBlog(page, 'playwright blog two', 'playwrightertwo', 'www.playwrtierblogtwo.com'); 
            await createBlog(page, 'playwright blog three', 'playwrighterthree', 'www.playwrtierblogthree.com'); 

            await page.getByText('playwright blog three')
                .getByRole('button', { name: 'view' }).click();
            await page.getByRole('button', { name: 'Like' }).click();
            await page.getByRole('button', { name: 'Like' }).click();
            await page.getByRole('button', { name: 'Like' }).click();
            await page.getByText('playwright blog three')
            .getByRole('button', { name: 'hide' }).click();
            
            await page.getByText('playwright blog one')
                .getByRole('button', { name: 'view' }).click();
            await page.getByRole('button', { name: 'Like' }).click();
            await page.getByRole('button', { name: 'Like' }).click();
            await page.getByText('playwright blog one')
                .getByRole('button', { name: 'hide' }).click();

            const blogs = await page.locator('.blog').all();
            const blogTitles = await Promise.all(blogs.map(async element => {
                return await element.textContent();
            }));

            expect(blogTitles[0]).toBe('playwright blog threeview');
            expect(blogTitles[1]).toBe('playwright blog oneview');
        });
    });
});