import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("renders the desktop shell", () => {
  const { container } = render(<App />);

  expect(screen.getByLabelText(/macos style portfolio desktop/i)).toBeInTheDocument();
  expect(screen.getByRole("navigation", { name: /dock/i })).toBeInTheDocument();
  expect(screen.getByLabelText("Gretchen")).toHaveTextContent("👩🏻‍💻");

  const photosButton = screen.getByRole("button", { name: /photos/i });
  const mailButton = screen.getByRole("button", { name: /mail/i });
  const notesButton = screen.getByRole("button", { name: /notes/i });

  expect(photosButton.querySelector("img")?.getAttribute("src")).toContain(
    "apple-photos-icon.webp"
  );
  expect(mailButton.querySelector("img")?.getAttribute("src")).toContain(
    "apple-mail-icon.webp"
  );
  expect(notesButton.querySelector("img")?.getAttribute("src")).toContain(
    "apple-notes-icon.webp"
  );
  expect(screen.getByRole("button", { name: /open resume\.pdf/i })).toBeInTheDocument();

  fireEvent.click(photosButton);
  expect(screen.queryByRole("button", { name: /upload photos/i })).not.toBeInTheDocument();
  expect(container.querySelector('input[type="file"]')).not.toBeInTheDocument();
  expect(screen.getAllByLabelText("Resize window n").length).toBeGreaterThan(0);

  fireEvent.click(notesButton);
  expect(screen.getByRole("button", { name: "Note 1" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Note 2" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Note 3" })).toBeInTheDocument();
});
