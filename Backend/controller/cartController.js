import Cart from "../model/cart.js";

// Add item to cart

const addItemToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ userId });

    // 🟢 agar cart nahi hai → new banao
    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity: 1 }]
      });
    } else {

      // 🟢 check karo item already hai ya nahi
      const item = cart.items.find(
        i => i.productId.toString() === productId
      );

      if (item) {
        item.quantity += 1; // 🔥 quantity badhao
      } else {
        cart.items.push({ productId, quantity: 1 }); // ➕ new item
      }
    }

    await cart.save();
    await cart.populate("items.productId");
    res.json({
      message: "Item added to cart",
      cart
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// remove items 

const removeItems = async (req, res) => {
  try {
    const { userId, productId } = req.body
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "cart not found" })
    }
    cart.items = cart.items.filter(
      i => i.productId.toString() !== productId
    );

    await cart.save()
    res.json({
      message: "Item remove from cart",
      cart
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}

// update item quantity in cart 

const updateQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body
    const cart = await Cart.findOne({ userId })
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" })
    }

    const item = cart.items.find(
      i => i.productId.toString() === productId
    )
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" })
    }
    item.quantity = quantity

    await cart.save()
    res.json({
      message: 'item quantity updated',
      cart
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}

// get cart by userId

const getCart = async (req, res) => {
  try {
    const { userId } = req.params
    const cart = await Cart.findOne({ userId }).populate('items.productId')
    if (!cart) {
      return res.sattus(404).json({ message: "Cart not fond" })
    }
    res.json(cart)
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}
export { addItemToCart, removeItems, updateQuantity, getCart }