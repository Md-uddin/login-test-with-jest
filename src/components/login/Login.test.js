import { __esModule } from "@testing-library/jest-dom/dist/matchers";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    get: () => ({
      data: { id: 1, name: "John" },
    }),
  },
}));

test("username input should be rendered", () => {
  render(<Login />);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  expect(usernameInputEl).toBeInTheDocument();
  expect(usernameInputEl.value).toBe("");
});

test("password input should be rendered", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl).toBeInTheDocument();
  expect(passwordInputEl.value).toBe("");
});

test("login button should be disabled", () => {
  render(<Login />);
  const loginButton = screen.getByRole("button", { name: /login/i });
  expect(loginButton).toBeDisabled();
});

test("error message should not be visible", () => {
  render(<Login />);
  const errorEl = screen.getByTestId("error");
  expect(errorEl).not.toBeVisible();
});

test("username input should work", () => {
  render(<Login />);
  let textValue = "hello";
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  fireEvent.change(usernameInputEl, { target: { value: textValue } });
  expect(usernameInputEl.value).toBe(textValue);
});

test("password input should work", () => {
  render(<Login />);
  let textValue = "password";
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  fireEvent.change(passwordInputEl, { target: { value: textValue } });
  expect(passwordInputEl.value).toBe(textValue);
});

test("login button should not  be in loading state", () => {
  render(<Login />);
  const loginButton = screen.getByRole("button", { name: /login/i });
  expect(loginButton).not.toHaveTextContent(/please wait/i);
});

test("login button should be enabled when there is a value", () => {
  render(<Login />);
  const loginButton = screen.getByRole("button", { name: /login/i });

  let textValue = "hello";
  let textValuePass = "password";
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  fireEvent.change(usernameInputEl, { target: { value: textValue } });
  expect(usernameInputEl.value).toBe(textValue);
  fireEvent.change(passwordInputEl, { target: { value: textValuePass } });

  expect(passwordInputEl.value).toBe(textValuePass);
  expect(loginButton).toBeEnabled();
});

// test("login button should   be in loading state on click", () => {
//   render(<Login />);
//   const loginButton = screen.getByRole("button", { name: /login/i });
//   expect(loginButton).not.toHaveTextContent(/please wait/i);
// });

test("state should be in loading on click", () => {
  render(<Login />);
  const loginButton = screen.getByRole("button", { name: /login/i });

  let textValue = "hello";
  let textValuePass = "password";
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  fireEvent.change(usernameInputEl, { target: { value: textValue } });
  expect(usernameInputEl.value).toBe(textValue);
  fireEvent.change(passwordInputEl, { target: { value: textValuePass } });
  fireEvent.click(loginButton);

  expect(loginButton).toHaveTextContent(/please wait/i);
});
test("state should not be visible after fetching", async () => {
  render(<Login />);
  const loginButton = screen.getByRole("button", { name: /login/i });

  let textValue = "hello";
  let textValuePass = "password";
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  fireEvent.change(usernameInputEl, { target: { value: textValue } });
  expect(usernameInputEl.value).toBe(textValue);
  fireEvent.change(passwordInputEl, { target: { value: textValuePass } });
  fireEvent.click(loginButton);

  await waitFor(() =>
    expect(loginButton).not.toHaveTextContent(/please wait/i)
  );
});
test("user should be render after fetching", async () => {
  render(<Login />);
  const loginButton = screen.getByRole("button", { name: /login/i });

  let textValue = "jhon";
  let textValuePass = "password";
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  fireEvent.change(usernameInputEl, { target: { value: textValue } });
  expect(usernameInputEl.value).toBe(textValue);
  fireEvent.change(passwordInputEl, { target: { value: textValuePass } });
  fireEvent.click(loginButton);
  const userItem = await screen.findByText("jhon");

  expect(userItem).toBeInTheDocument();
});
