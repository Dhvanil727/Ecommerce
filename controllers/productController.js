import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";
import categoryModel from "../models/categoryModel.js"
import braintree from "braintree";
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv"

dotenv.config();
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createproductcontroller = async (request, response) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      request.fields;
    const { photo } = request.files;
    switch (true) {
      case !name:
        response.status(500).send({ message: "Name is requires" });
      case !description:
        response.status(500).send({ message: "description is requires" });
      case !price:
        response.status(500).send({ message: "price is requires" });
      case !category:
        response.status(500).send({ message: "Category is requires" });
      case !quantity:
        response.status(500).send({ message: "quantity is requires" });
      case photo && photo.size >100000:
        response.status(500).send({ message: "photo size is too large" });
    }
    const products = new productModel({...request.fields,slug:slugify(name)});
    if(photo){
        products.photo.data=fs.readFileSync(photo.path);
        products.photo.contentType=photo.type
    }
    await products.save();
    response.status(200).send({
        success:true,
        message:"product created successfully",
        products
    })
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      message: " error in create Product ",
      error,
    });
  }
};

export const getallproductscontroller=async(request,response)=>{
    try {
        const products=await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1});
        response.status(200).send({
            success:true,
            count_total:products.length,
            message:"products fetched successfully",
            products
        })
    } catch (error) {
        console.log(error);
        response.status(500).send({
            success: false,
            message: " error in get all products ",
            error
        })
    }
}

export const getsingleproductscontroller=async(request,response)=>{
  try {
    const product=await productModel.findOne({slug:request.params.slug}).select("-photo").populate('category');
    response.status(200).send({
      success:true, 
      message:"product fetched successfully",
      product
    })
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      message: " error in get single products ",
      error

    })
  }
}
export const productphotocontroller=async(request,response)=>{
try {
  const product=await productModel.findById(request.params.pid).select("photo");
  if(product.photo.data){
    response.set("Content-type", product.photo.contentType);
    return response.status(200).send(product.photo.data);
  }
} catch (error) {
  console.log(error);
  response.status(500).send({
    success: false,
    message: " error in getting photo ",
    error
  })
}
}

export const deleteproductcontroller=async(request,response)=>{
  try {
    const product =await productModel.findByIdAndDelete(request.params.pid).select("-photo");
    response.status(200).send({
      success:true,
      message:"product deleted successfully",
      
    })
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      message: " error in deleting product ",
      error

    })
  }
}

export const updateproductcontroller=async(request,response)=>{
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      request.fields;
    const { photo } = request.files;
    switch (true) {
      case !name:
        response.status(500).send({ message: "Name is requires" });
      case !description:
        response.status(500).send({ message: "description is requires" });
      case !price:
        response.status(500).send({ message: "price is requires" });
      case !category:
        response.status(500).send({ message: "Category is requires" });
      case !quantity:
        response.status(500).send({ message: "quantity is requires" });
      case photo && photo.size >100000:
        response.status(500).send({ message: "photo size is too large" });
    }
    const products = await productModel.findByIdAndUpdate(request.params.pid,{...request.fields,slug:slugify(name)},{new:true});
    if(photo){
        products.photo.data=fs.readFileSync(photo.path);
        products.photo.contentType=photo.type
    }
    await products.save();
    response.status(200).send({
        success:true,
        message:"product updated successfully",
        products
    })
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      message: " error in update Product ",
      error,
    });
  }
}

export const filterproductcontroller=async(request,response)=>{
  try {
    const {checked, radio}=request.body;
    let args={}
    if(checked.length >0) args.category=checked;
    if(radio.length) args.price={$gte:radio[0] , $lte :radio[1]}
    const products= await productModel.find(args)
    response.status(200).send({
      success:true,
      products
    })
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      message: " error in filter Product ",
      error,
    });
  }
}

export const productcountcontroller=async(request,response)=>{
  try {
    const total=await productModel.find({}).estimatedDocumentCount();
    response.status(200).send({
      success:true,
      total
    })
  } catch (error) {
    console.log(error);
    response.status(400).send({
      success: false,
      message: " error in product count ",
      error,
    })
  }
}

//product list based on page
export const productlistcontroller=async(request,response)=>{
  try {
    const perpage=7;
    const page=request.params.page? request.params.page:1
    const products=await productModel.find({}).select("-photo").limit(perpage)
    response.status(200).send({
      success:true,
      products
    })
  } catch (error) {
    console.log(error);
    response.status(400).send({
      success: false,
      message: " error in product list ",
      error,
    })
  }
}

export const searchproductcontroller=async(request,response)=>{
  try {
    const {keyword}=request.params
    const results=await productModel.find({
      $or:[
        {name:{$regex:keyword,$options:"i"} },
        {description:{$regex:keyword,$options:"i"} },
      ]
    }).select("-photo");
    response.json(results); 
  } catch (error) {
    console.log(error);
  response.status(400).send({
    success: false,
    message: " error in search product ",
    error,
  })
  }
}

export const relatedproductcontroller=async(request,response)=>{
  try {
    const {pid,cid}=request.params;
    const products =await productModel.find({
      category:cid,
      _id:{$ne:pid}
    }).select("-photo").limit(3).populate("category")
    response.status(200).send({
      success:true,
      products
    }) 
  } catch (error) {
    console.log(error)
    response.status(400).send({
      success: false,
      message: " error in related product ",
      error,

    })
  }
}

export const productcategorycontroller=async(request,response)=>{
  try {
    const category=await categoryModel.findOne({slug:request.params.slug});
    const products=await productModel.find({category}).populate("category");
    response.status(200).send({
      success:true,
      products,
      category
    })
  } catch (error) {
    console.log(error);
    response.status(400).send({
      success: false,
      message: " error in product category ",
      error,
    })
  }
}
//payment gateway
//token
export const braintreetokencontroller=async(request,res)=>{
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
}
//payment
export const braintreepaymentcontroller=async(request,response)=>{
  try {
    const { nonce, cart } = request.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: request.user._id,
          }).save();
          response.json({ ok: true });
        } else {
          response.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}