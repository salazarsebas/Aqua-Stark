import { X, Plus, Minus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/use-cart-store";
import { Button } from "@/components/ui/button";

export function CartSidebar() {
  const {
    items,
    setCheckoutStep,
    isOpen,
    toggleCart,
    removeItem,
    updateQuantity,
  } = useCartStore();

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const fee = subtotal * 0.01;
  const total = subtotal + fee;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={toggleCart}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-[25rem] bg-blue-700 shadow-lg z-50"
          >
            <div className="p-4 flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Shopping Cart</h2>
                <Button
                  variant="ghost"
                  onClick={toggleCart}
                  className="text-white"
                >
                  <X size={24} />
                </Button>
              </div>

              <div className="flex-1 overflow-auto">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="bg-blue-600 rounded-lg p-4 mb-4 flex items-center"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">
                          {item.name}
                        </h3>
                        <p className="text-blue-200">{item.price} coins</p>
                        <div className="flex items-center mt-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-white p-1 hover:bg-blue-500/50 rounded"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(0, item.quantity - 1)
                              )
                            }
                          >
                            <Minus size={16} />
                          </motion.button>
                          <motion.span
                            key={item.quantity}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            className="mx-2 text-white"
                          >
                            {item.quantity}
                          </motion.span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-white p-1 hover:bg-blue-500/50 rounded"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus size={16} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1, color: "#ef4444" }}
                            whileTap={{ scale: 0.9 }}
                            className="text-red-400 ml-auto p-1 hover:bg-red-500/10 rounded"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Cart Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-blue-500 mt-4 pt-4"
              >
                <div className="flex justify-between text-white mb-2">
                  <span>Subtotal:</span>
                  <span>{subtotal} coins</span>
                </div>
                <div className="flex justify-between text-white mb-2">
                  <span>Transaction Fee (1%):</span>
                  <span>{fee} coins</span>
                </div>
                <div className="flex justify-between text-white font-bold mb-4">
                  <span>Total:</span>
                  <span>{total} coins</span>
                </div>
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => setCheckoutStep("confirm")}
                  disabled={items.length === 0}
                >
                  Proceed to Checkout
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
