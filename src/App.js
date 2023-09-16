import { useEffect } from 'react';
import Navbar from './components/navbar';
import CartContainer from './components/CartContainer';
import Modal from './components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotals } from './features/cart/cartSlice';

function App() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
