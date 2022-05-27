import { screen,render } from "@testing-library/react";
import App from "./src/App";

test('learn react is visible', () => {
  render(<App />)
  const text = screen.getByText(/learn react/i);
  expect(text).toBeVisible()
});