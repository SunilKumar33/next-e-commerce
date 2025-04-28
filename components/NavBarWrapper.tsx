import { getCategories } from "../lib/products";
import { Navbar } from "./NavBar";

export async function NavBarWrapper() {
  const categories = await getCategories();

  return <Navbar categories={categories} />;
}
