import { useLoaderData } from "react-router-dom";
import ProductsGridMy from "./ProductsGridMy";
import ProductsGridNew from "./ProductsGridNew";
import ProductsList from "./ProductsList";
import { useState } from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";
import SectionTitle from "./SectionTitle";

const layouts = {
  grid: "grid",
  list: "list",
};

const getLayoutFromLocalStorage = () => {
  return localStorage.getItem("layout") || layouts.grid;
};

const ProductsContainerMy = () => {
  const { total, params } = useLoaderData();
  const totalProducts = total;
  // console.log("totalProducts", totalProducts);
  const [layout, setLayout] = useState(getLayoutFromLocalStorage);

  const setActiveStyles = (pattern) => {
    return `text-xl btn btn-circle btn-sm ${
      pattern === layout
        ? "btn-primary text-primary-content"
        : "btn-ghost text-based-content"
    }`;
  };

  const handleGrid = () => {
    setLayout("grid");
    localStorage.setItem("layout", "grid");
  };

  const handleList = () => {
    setLayout("list");
    localStorage.setItem("layout", "list");
  };

  return (
    <>
      {/* HEADER */}

      <div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
        <h4 className="font-medium text-base">
          {totalProducts} product{totalProducts > 1 && "s"}
        </h4>
        <div className="flex gap-x-2">
          <button
            type="button"
            onClick={handleGrid}
            className={setActiveStyles("grid")}
          >
            <BsFillGridFill />
          </button>
          <button
            type="button"
            onClick={handleList}
            // onClick={() => setLayout("list")}
            className={setActiveStyles("list")}
          >
            <BsList />
          </button>
        </div>
      </div>
      {/* PRODUCTS */}
      <div>
        {totalProducts === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, no products matched your search...
          </h5>
        ) : layout === "grid" ? (
          <ProductsGridMy />
        ) : (
          // <ProductsGrid />
          <ProductsList />
        )}
      </div>
    </>
  );
};
export default ProductsContainerMy;