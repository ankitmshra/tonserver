import { RouteConfig } from "@medusajs/admin"
import Medusa from "@medusajs/medusa-js"
import React, { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { useAdminCreateProduct } from "medusa-react";
import { AdminPostProductsReq } from "@medusajs/medusa";
import './style.css'

type CreateProductData = {
  title: string;
  is_giftcard: false;
  discountable: false;
  
};
type Product = {
    product_number:string;
    short_description:string;
    category: string,
    full_feature_description:string;
    front_image:string;
    price_range:any;

    
    // Add more fields as needed
  };
  type singleProduct = {
    product_number:string;
    short_description:string;
    category: string,
    full_feature_description:string;
    front_image:string;
    price_range:any;

    
    // Add more fields as needed
  };
  

const CreateProduct = () => {
  const createProduct = useAdminCreateProduct();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const pageCount = Math.ceil(count / 25); // Assuming 5 items per page
  const [searchTerm, setSearchTerm] = useState('');
  const [singleProductData, setSingleProductData] = useState('')
  const baseUrl ="https://www.alphabroder.com/media/hires";
  

 
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    return product.short_description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://0.0.0.0:3050/api/products/?page=1&page_size=32",
          {
            headers: {
              accept: "application/json",
            },
          }
        );
        setProducts(response.data.results);
        setLoading(false);
        setCount(response.data.count);
        setNextPage(response.data.next);
        setPrevPage(response.data.previous);
      } catch (error) {
        setError("An error occurred while fetching products.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExportClick = async (productNumber) => {
    try {
      const response = await axios.get(
        `http://0.0.0.0:3050/api/${productNumber}/`,
        {
          headers: {
            accept: "application/json",
          },
        }
      );
      
     
  const handleCreate = () => {
    const productData: CreateProductData = {
        title: response.data.short_description,
        is_giftcard: false,
        discountable: false,
        
      }
    createProduct.mutate(productData as AdminPostProductsReq, {
      onSuccess: ({ product }) => {
        alert("Product Successfully Exported.")
        console.log(product.id);
      },
    });
  };
  handleCreate();
      
      // Call handleCreate function with the response data
      console.log(response.data);
      setSingleProductData(response.data);
    } catch (error) {
      console.error("An error occurred while fetching product details:", error);
    }
  };
  
  const handlePageChange = async (url: string) => {
    try {
      const response = await axios.get(url);
      setProducts(response.data.results);
      setCount(response.data.count);
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
    } catch (error) {
      setError("An error occurred while fetching products.");
    }
  };

 
  return (
    <>
    <div>
     {/* <button onClick={handleCreate}>click me</button> */}
    </div>
    <div>
    <div className="headerTab">
        <div>
            <h1>Alphaborder</h1>
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
    {loading && <p>Loading...</p>}
    {error && <p>{error}</p>}
    <div className="product-grid">
          {filteredProducts.map((product, index) => (
            <div key={index} className="product-card">
              <img src={`${baseUrl}/${product.front_image}`} alt={product.short_description} />
              <h3>{product.short_description}</h3>
              <p><b>Price Range:</b> ${product.price_range.min_price} - ${product.price_range.max_price}</p>
              <p><b>Product Number:</b> ALPB{product.product_number}</p>
              <p><b>Category:</b> {product.category}</p>
              <p>{truncateDescription(product.full_feature_description, 80)}</p>
              <button onClick={()=>handleExportClick (product.product_number)} >Export</button>            
              </div>
          ))}
        </div>
    <div className="pagination">
        {prevPage && (
          <button onClick={() => handlePageChange(prevPage)}>Previous</button>
        )}
        {nextPage && (
          <button onClick={() => handlePageChange(nextPage)}>Next</button>
        )}
        {/* <p>Page 1 of {pageCount}</p> */}
      </div>
  </div>
  </>
  );
};


export const config: RouteConfig = {
  link: {
    label: "Alphaborder",
  },
}
export default CreateProduct;

