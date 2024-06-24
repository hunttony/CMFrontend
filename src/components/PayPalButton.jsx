// src/components/PayPalButton.jsx

const PayPalButton = () => {
  return (
    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
      <input type="hidden" name="cmd" value="_s-xclick" />
      <input type="hidden" name="hosted_button_id" value="XA587Y8NTFXWQ" />
      <input type="hidden" name="currency_code" value="USD" />
      <input type="hidden" name="return" value={`${process.env.REACT_APP_FRONTEND_URL}/success`} />
      <input type="hidden" name="cancel_return" value={`${process.env.REACT_APP_FRONTEND_URL}/cancel`} />
      <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Buy Now" />
    </form>
  );
};

export default PayPalButton;
