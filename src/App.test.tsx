import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("renders the desktop shell", () => {
  const { container } = render(<App />);

  expect(screen.getByLabelText(/macos style portfolio desktop/i)).toBeInTheDocument();
  expect(screen.getByRole("navigation", { name: /dock/i })).toBeInTheDocument();
  const systemMenuButton = screen.getByRole("button", { name: /gretchen menu/i });
  expect(systemMenuButton).toHaveTextContent("👩🏻‍💻");

  const photosButton = screen.getByRole("button", { name: /photos/i });
  const mailButton = screen.getByRole("button", { name: /mail/i });
  const notesButton = screen.getByRole("button", { name: /notes/i });
  const stickiesButton = screen.getByRole("button", { name: /stickies/i });

  expect(photosButton.querySelector("img")?.getAttribute("src")).toContain(
    "apple-photos-icon.webp"
  );
  expect(mailButton.querySelector("img")?.getAttribute("src")).toContain(
    "apple-mail-icon.webp"
  );
  expect(notesButton.querySelector("img")?.getAttribute("src")).toContain(
    "apple-notes-icon.webp"
  );
  expect(stickiesButton.querySelector("img")?.getAttribute("src")).toContain(
    "apple-stickies-icon.svg"
  );

  fireEvent.click(systemMenuButton);
  fireEvent.click(screen.getByRole("menuitem", { name: /about me/i }));
  expect(screen.getByRole("heading", { name: /gretchen lam/i })).toBeInTheDocument();
  expect(screen.getByText(/UC Santa Barbara/i)).toBeInTheDocument();
  expect(screen.getByText(/B\.S\. in Computer Science/i)).toBeInTheDocument();

  const resumeFile = screen.getByRole("button", { name: /open resume\.pdf/i });
  expect(resumeFile).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /open about_me\.pdf/i })).not.toBeInTheDocument();

  fireEvent.doubleClick(resumeFile);
  const resumePreview = screen.getByLabelText(/resume pdf preview/i);
  const resumePage = screen.getByRole("img", { name: /resume page/i });
  expect(resumePage).toHaveAttribute(
    "src",
    expect.stringContaining("files/resume-page-1.png")
  );
  expect(screen.queryByRole("button", { name: /zoom in/i })).not.toBeInTheDocument();
  fireEvent.wheel(resumePreview, { ctrlKey: true, deltaY: -100 });
  expect(resumePage).toHaveStyle({ width: "66%" });

  fireEvent.click(photosButton);
  expect(screen.queryByRole("button", { name: /upload photos/i })).not.toBeInTheDocument();
  expect(container.querySelector('input[type="file"]')).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: /favorites/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /travel/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /hobbies/i })).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /recents/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /projects/i })).not.toBeInTheDocument();
  expect(screen.queryByLabelText(/photo album/i)).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: /travel/i }));
  expect(screen.getByRole("button", { name: /travel/i })).toHaveClass("selected");
  expect(screen.getAllByLabelText("Resize window n").length).toBeGreaterThan(0);

  fireEvent.click(mailButton);
  expect(screen.getByRole("link", { name: /gretchenlam03@gmail\.com/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /github/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /linkedin/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /instagram/i })).toBeInTheDocument();

  fireEvent.click(notesButton);
  expect(screen.getByRole("button", { name: /Closet Tracker/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /VR Cooking Simulation/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Facial Frenzy/i })).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /open closet tracker repository/i })
  ).toHaveAttribute(
    "href",
    "https://github.com/ucsb-cs148-w25/pj12-closettracker"
  );
  expect(screen.queryByLabelText(/note page/i)).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: /VR Cooking Simulation/i }));
  expect(
    screen.getByRole("link", { name: /open vr cooking simulation repository/i })
  ).toHaveAttribute("href", "https://github.com/gretchenlam/unity-vr-cooking");
  fireEvent.click(screen.getByRole("button", { name: /Facial Frenzy/i }));
  expect(
    screen.getByRole("link", { name: /open facial frenzy repository/i })
  ).toHaveAttribute("href", "https://github.com/gretchenlam/Facial-Frenzy");
  expect(screen.queryByLabelText(/notes toolbar/i)).not.toBeInTheDocument();

  expect(screen.getByText(/hello, world!/i)).toBeInTheDocument();
  fireEvent.click(stickiesButton);
  expect(screen.getByText(/welcome to my portfolio desktop/i)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /close hello, world!/i })
  ).toBeInTheDocument();
  expect(screen.queryByRole("article", { name: /^Stickies$/i })).not.toBeInTheDocument();
});
