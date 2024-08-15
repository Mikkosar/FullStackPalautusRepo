const loginWith = async (page, username, password) => {
    await page.getByTestId('username').fill(username);
    await page.getByTestId('password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
};

const createBlog = async (page, title, author, url) => {
    await page.getByTestId('blogform_title').fill(title);
    await page.getByTestId('blogform_author').fill(author);
    await page.getByTestId('blogform_url').fill(url);
    await page.getByRole('button', { name: 'Create' }).click();
    await page.getByText(title, author, url).waitFor();
}

export { loginWith, createBlog };