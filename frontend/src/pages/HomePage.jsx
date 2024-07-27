import ProductsList from '../components/ProductsList';

export default function HomePage({ isLoggedIn, cartItems, setCartItems }) {
  return (
    <div>
      <div>
        <h1>Welcome!</h1>
        <ProductsList isLoggedIn={isLoggedIn} cartItems={cartItems} setCartItems={setCartItems} />
      </div>
      {isLoggedIn && <h3>Logged In!</h3>}
    </div>
  );
}
