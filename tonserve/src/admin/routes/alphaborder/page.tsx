import { RouteConfig } from "@medusajs/admin"
import Medusa from "@medusajs/medusa-js"
import React, { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';



// const CreateProduct = () => {
//     const medusa = new Medusa({ baseUrl: 'http://localhost:9000', maxRetries: 0});
//     const [accessToken, setAccessToken] = useState('');
//     const [accessUserId, setUserId] = useState('');
//     const [accessUserToken, setAcecssUserToken] = useState('');



// medusa.admin.auth.getToken(
//     {
//         "email": "admin@tonserve.com",
//         "password": "Bicky2737"
//       }

// )

// .then(({ access_token }) => {

//   console.log(access_token);
//   setAccessToken(access_token);
  

// })


// // must be previously logged in or use api token
// medusa.admin.auth.getSession()
// .then(({ user }) => {
//   console.log(user.id);
//   setUserId(user.id);
// })


// // console.log(accessUserId,accessToken)
// // medusa.admin.users.update(accessUserId, {
// //     api_token: accessToken
// // })
// // .then(({ user }) => {
// //   console.log(user.api_token);
// //   setAcecssUserToken(user.api_token);
// // })


// // // must be previously logged in or use api token

// //   // State to store the response or error message
// //   const [response, setResponse] = useState(null);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const backendUrl = 'http://localhost:9000'; // Replace {backend_url} with your actual backend URL
// //     const apiToken = accessUserToken; // Replace {api_token} with your actual API token

// //     const requestData = {
// //       title: "Shirt"
// //     };

// //     axios.post(`${backendUrl}/admin/products`, requestData, {
// //       headers: {
// //         'x-medusa-access-token': apiToken,
// //         'Content-Type': 'application/json'
// //       }
// //     })
// //     .then(response => {
// //       console.log('Product created successfully:', response.data);
// //       // Handle any further actions after successful creation
// //     })
// //     .catch(error => {
// //       console.error('Error creating product:', error);
// //       // Handle error scenarios
// //     });
// //   }, []);

// // must be previously logged in or use api token
// medusa.admin.products.create({
//   title: "Shirt764367",
//   is_giftcard: false,
//   discountable: true
// })
// .then(({ product }) => {
//   console.log(product.id);
// })


//   return (
//     <div>
//       <h2>Create Product</h2>
//       <form >
//         <button type="submit">Create Product</button>
//       </form>
    
//     </div>
//   );
// };

import { useAdminCreateProduct } from "medusa-react";
import { AdminPostProductsReq } from "@medusajs/medusa";

type CreateProductData = {
  title: String;
  is_giftcard: false;
  discountable: false;
  
};

const CreateProduct = () => {
  const createProduct = useAdminCreateProduct();

  const handleCreate = () => {
    const productData: CreateProductData = {
        title: "String123",
        is_giftcard: false,
        discountable: false,
        
      }
    createProduct.mutate(productData as AdminPostProductsReq, {
      onSuccess: ({ product }) => {
        console.log(product.id);
      },
    });
  };
 
//   useEffect(() => { handleCreate({
//     title: "String",
//     is_giftcard: false,
//     discountable: false,
    
//   });});

  return (
    <div>
     <button onClick={handleCreate}>click me</button>
    </div>
  );
};







export const config: RouteConfig = {
  link: {
    label: "Alphaborder",
  },
}
export default CreateProduct;

