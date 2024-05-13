import ProductDetails from "@/components/ProductDetails";

interface ProductProps {
  params: {
    product: string;
  };

}


export default function Product({params}: ProductProps) {
  const { product } = params; 
  
  return ( 
    <ProductDetails productId={product}/>
  );
}
