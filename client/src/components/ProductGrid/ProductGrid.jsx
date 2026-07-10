import "./ProductGrid.css";
import ProductCard from "../ProductCard/ProductCard";
import products from "../../data/products";

function ProductGrid(){
    return(
        <div className="product-grid">
            {
                products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))
            }
        </div>
    );
}

export default ProductGrid;