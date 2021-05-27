import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import App from "./App";
import { Router, BrowserRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Filter, Header } from "./components";
import { Info, Jogs, ContactUs } from "./pages";

describe("Jogs", () => {
  const props = {
    dataJogs: [
      {
        id: 3090,
        user_id: "3",
        distance: 10,
        time: 10,
        date: 652838400,
      },
      {
        id: 3333,
        user_id: "3",
        distance: 50,
        time: 50,
        date: 652838400,
      },
    ],
    token: "fsp[eflkp[sekfso9jewqerewr",
    userId: "3",
    getDataJogs: () => {},
  };

  it("render Jogs component", () => {
    render(<Jogs />);
    expect(screen.getByTestId("jogs-component")).toBeInTheDocument();
  });

  it("render 2 jog", () => {
    render(<Jogs {...props} />);
    expect(screen.getAllByTestId("jog")).toHaveLength(2);
  });

  it("render form jog", () => {
    render(<Jogs />);
    expect(screen.queryAllByRole("form")).toHaveLength(0);
    fireEvent.click(screen.getByTestId("is-form-jog"));
    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("render form update jog", () => {
    render(<Jogs {...props} />);
    let element = screen.getAllByTestId("jog");
    fireEvent.click(element[0]);
    expect(screen.getByRole("form")).toBeInTheDocument();
  });
});

describe("App", () => {
  it("render App component", () => {
    render(<App />);
    expect(screen.getByTestId("app-component")).toBeInTheDocument();
  });
});

describe("Router-INFO", () => {
  it("/INFO", () => {
    const history = createMemoryHistory();
    const route = "/INFO";
    history.push(route);
    render(
      <Router history={history}>
        <Info />
      </Router>
    );

    expect(screen.getByTestId("location-info")).toHaveTextContent(/INFO/i);
  });
});

describe("Header", () => {
  it("renders learn to react link", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Header />
      </Router>
    );
    const linkElement = screen.getByText(/JOGS/i);

    expect(linkElement).toBeInTheDocument();
  });
});

describe("Header", () => {
  it("render header component ", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByTestId("location-header").className).toBe("header");
  });

  it("addEventListener size", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    act(() => {
      window.innerWidth = 1200;
    });
    fireEvent(window, new Event("resize"));

    expect(window.innerWidth).toBe(1200);
  });

  it("click burger menu", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByTestId("header-burger-input"));

    expect(screen.getByTestId("location-header").className).toBe(
      "header open-burger"
    );
  });
});

describe("Info", () => {
  it("renders learn to react link", () => {
    render(<Info />);
    const linkElement = screen.getByText(/1500s/i);
    expect(linkElement).toBeInTheDocument();
  });
});

describe("ContactUs", () => {
  it("renders learn to react link", () => {
    render(<ContactUs />);
    const linkElement = screen.getByText(/Contact us/i);
    expect(linkElement).toBeInTheDocument();
  });
});

describe("Filter", () => {
  it("render placeholder date from", () => {
    render(<Filter />);
    const linkElement = screen.getByPlaceholderText("13.01.1970");
    expect(linkElement).toBeInTheDocument();
  });
  it("render placeholder date to", () => {
    render(<Filter />);
    const linkElement = screen.getByPlaceholderText("18.01.1970");
    expect(linkElement).toBeInTheDocument();
  });

  describe("render handleChange event:", () => {
    const props = {
      dataJogs: [
        {
          id: 3090,
          user_id: "3",
          distance: 10,
          time: 10,
          date: 652838400,
        },
      ],
      searchResults: [
        {
          id: 3333,
          user_id: "3",
          distance: 50,
          time: 50,
          date: 652838400,
        },
      ],
      isSearchResults: () => {},
    };

    describe("render handleChange event: Date From", () => {
      it("full date", () => {
        render(<Filter {...props} />);
        fireEvent.change(screen.getByPlaceholderText("13.01.1970"), {
          target: { value: "13.01.1970", name: "setFilterFrom" },
        });
      });
      it("not full date", () => {
        render(<Filter {...props} />);
        fireEvent.change(screen.getByPlaceholderText("13.01.1970"), {
          target: { value: "13.01", name: "setFilterFrom" },
        });
      });
    });

    describe("render handleChange event: Date to", () => {
      it("full date", () => {
        render(<Filter {...props} />);
        fireEvent.change(screen.getByPlaceholderText("18.01.1970"), {
          target: { value: "18.01.1970", name: "setFilterTo" },
        });
      });
      it("not full date", () => {
        render(<Filter {...props} />);
        fireEvent.change(screen.getByPlaceholderText("18.01.1970"), {
          target: { value: "18.01", name: "setFilterTo" },
        });
      });
    });
  });
});
