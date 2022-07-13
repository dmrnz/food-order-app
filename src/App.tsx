import React, {useContext} from 'react';
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartContext from './components/store/cart-context';

function App() {
    const cartContext = useContext(CartContext);

    return (
        <>
            <Header/>
            {cartContext.isVisible && <Cart />}
            <main>
                <Meals/>
            </main>
        </>
    );
}

export default App;
