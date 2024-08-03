import ProductsList from '../components/ProductsList';

export default function HomePage({ isLoggedIn, cartItems, setCartItems, bearerToken}) {
  return (
    <div>
      <div>
        <h1>Welcome!</h1>
        <ProductsList isLoggedIn={isLoggedIn} cartItems={cartItems} setCartItems={setCartItems} bearerToken={bearerToken} />
      </div>
      {isLoggedIn && <h3>Logged In! {bearerToken}</h3>}
    </div>
  );
}
