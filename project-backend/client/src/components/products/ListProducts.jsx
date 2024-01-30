import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListProducts = () => {
  const [products, setProducts] = React.useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const callProduct = async () => {
    try {
      const response = await axios.get("http://localhost:8800/api/v1/products");

      console.log("Data trả về =========>", response);
      setProducts(response.data.product);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  React.useEffect(() => {
    callProduct();
  }, []);

  const handleClickDetail = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-semibold text-center mb-6 text-white">
        Danh sánh sản phẩm
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <div
            key={product.product_id}
            onClick={() => handleClickDetail(product.product_id)}
            className="cursor-pointer bg-white p-4 rounded-lg shadow-md"
          >
            <img
              src={product.image}
              alt={product.product_name}
              className="w-full h-40 object-cover mb-4"
            />
            <div>
              <div className="font-bold text-lg mb-2">
                {product.product_name}
              </div>
              <div className="text-gray-600">{product.price}VND</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProducts;
