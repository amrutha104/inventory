import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../components/HomePage";
import App from "../App";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InventoryItemList from "../components/InventoryItemList";
import AddInventoryItem from "../components/AddInventoryItem";

// Test cases for HomePage component
test("frontend_should_check_home component with title and description", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <HomePage />
    </MemoryRouter>
  );

  await waitFor(() => {
    const titleElement = screen.getByText("Welcome to the Inventory Management System");
    const descriptionElement = screen.getByText("Manage your inventory efficiently and effectively!");

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });
});

test("frontend_should_add inventory item link on home page", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <HomePage />
    </MemoryRouter>
  );

  const addLink = screen.getByText("Add Inventory Item");

  expect(addLink).toBeInTheDocument();
  expect(addLink).toHaveAttribute("href", "/add");
});

// Test cases for Navbar component
test("frontend_should_check_navbar component with links", async () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  await waitFor(() => {
    const homeLink = screen.getByText("Home");
    const inventoryLink = screen.getByText("Inventory");

    expect(homeLink).toBeInTheDocument();
    expect(inventoryLink).toBeInTheDocument();
  });
});

// Test case for Footer component
test("frontend_should_check_footer component with copyright text", () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );

  const currentYear = new Date().getFullYear().toString();
  const copyrightText = screen.getByText(new RegExp(`© ${currentYear} Inventory Management System`));

  expect(copyrightText).toBeInTheDocument();
});

test("frontend_should_check_adding inventory item form", () => {
  render(
    <MemoryRouter initialEntries={["/add"]}>
      <AddInventoryItem />
    </MemoryRouter>
  );

  expect(screen.getByLabelText("Name:")).toBeInTheDocument();
  expect(screen.getByLabelText("Quantity:")).toBeInTheDocument();
  expect(screen.getByLabelText("Description:")).toBeInTheDocument();
  expect(screen.getByLabelText("Price:")).toBeInTheDocument();
  expect(screen.getByText("Add Item")).toBeInTheDocument();
});

// Test case for Footer component
test('frontend_should_check_Footer component with current year', () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );

  const currentYear = new Date().getFullYear().toString();
  const copyrightText = screen.getByText(new RegExp(`© ${currentYear} Inventory Management System`));

  expect(copyrightText).toBeInTheDocument();
});

test('frontend_should_check_No Items Found message when inventory is empty', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: () => Promise.resolve([]), // Empty inventory array
  });

  render(
    <MemoryRouter initialEntries={['/inventory']}>
      <InventoryItemList />
    </MemoryRouter>
  );

  await waitFor(() => {
    const noItemsMessage = screen.getByText('No Items Found');
    expect(noItemsMessage).toBeInTheDocument();
  });

  global.fetch.mockRestore();
});

// Test case: Handles error when deleting item fails
test("frontend_should_handles error when deleting item fails", async () => {
  const MOCK_DATA = [
    { id: 1, name: "Item 1", quantity: 10, description: "Description 1", price: 10.5 },
  ];

  jest.spyOn(global, "fetch").mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(MOCK_DATA),
  });

  render(
    <MemoryRouter initialEntries={["/inventory"]}>
      <InventoryItemList />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText(MOCK_DATA[0].name)).toBeInTheDocument();
  });

  jest.spyOn(global, "fetch").mockRejectedValueOnce(new Error("Failed to delete item"));

  fireEvent.click(screen.getByText("Delete"));

  global.fetch.mockRestore();
});

// Test case: Shows success message when item is deleted
test("frontend_should_shows success message when item is deleted", async () => {
  const MOCK_DATA = [
    { id: 1, name: "Item 1", quantity: 10, description: "Description 1", price: 10.5 },
  ];

  jest.spyOn(global, "fetch").mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(MOCK_DATA),
  });

  render(
    <MemoryRouter initialEntries={["/inventory"]}>
      <InventoryItemList />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText(MOCK_DATA[0].name)).toBeInTheDocument();
  });

  jest.spyOn(global, "fetch").mockResolvedValueOnce({
    ok: true,
  });

  fireEvent.click(screen.getByText("Delete"));

  await waitFor(() => {
    expect(screen.getByText("Item deleted successfully")).toBeInTheDocument();
  });

  global.fetch.mockRestore();
});

test("frontend_should_displays error messages for empty required fields", async () => {
  render(
    <MemoryRouter initialEntries={["/add"]}>
      <AddInventoryItem />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByText("Add Item"));

  await waitFor(() => {
    expect(screen.getByText("Name field is required")).toBeInTheDocument();
    expect(screen.getByText("Quantity field is required")).toBeInTheDocument();
    expect(screen.getByText("Description field is required")).toBeInTheDocument();
    expect(screen.getByText("Price field is required")).toBeInTheDocument();
  });
});