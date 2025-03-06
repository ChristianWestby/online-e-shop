
import { Link } from "react-router-dom";

const CheckoutSuccessPage = () => {
    return (
      <div>
        <h1>Thank you for your purchase!</h1>
        <p>Your order has been successfully processed.</p>
        <Link to="/">
        <button>Continue Shopping</button>
      </Link>
      </div>   
    );
   
  };
 
  export default CheckoutSuccessPage;