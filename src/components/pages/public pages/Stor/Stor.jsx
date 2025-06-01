import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { useLocation } from "react-router-dom";
import Loading from "../../../UI/Loading";
import { ActionContext } from "../../../Context/GlobalContext";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../../../../../../dashbord/src/components/UI/Pagination";

function Stor() {


  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const { addToCart ,cart } = useContext(ActionContext);


  // שליפת הנתונים של כל המוצרים
  const { data: ProductsData,
    isLoading: isProductsLoading,
    error: ProductsError,
    isError: isProductsError
  } = useQuery({
    queryKey: ["get_products", page],
    queryFn: async () => (await axios.get(`/Products/getAllProducts?page=${page}&&limit=${limit}`)).data,
    select: ({ data, pages }) => ({ data, pages }),
    staleTime: 1000 * 60,
    onSuccess: (data) => {
      console.log(data, "data of products ,,,,,,");

    },
    onError: (err) => {
      console.log(err);
      console.log(ProductsError);
    },

  });


  if (isProductsLoading) return <Loading />;
  else if (!isProductsLoading) console.log(ProductsData, "this is the data of products")



  return (
    <div>


      <div className="flex gap-5 items-center flex-wrap w-[90%] mx-auto">
        {ProductsData?.data.map((product, i) => (
          <ProductCard
            key={i}
            product={product}
            addToCart={addToCart}
            cart={cart}
          />
        ))}

        {isProductsError && (
          <div className="flex justify-center items-center h-[92vh] w-full">
            <div className="bg-[#111827] p-5 rounded-bl-3xl rounded-tr-3xl">
              <p
                dir="rtl"
                className="font-semibold text-5xl text-center text-white"
              >
                {ProductsError}
              </p>
            </div>
          </div>
        )}

      </div>
      <Pagination page={page} pages={ProductsData.pages} setPage={setPage} />
    </div>
  );

}

export default Stor