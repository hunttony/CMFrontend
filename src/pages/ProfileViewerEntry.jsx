
import { Box, Typography} from '@mui/material';

const ProfileViewerEntry = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
      bgcolor="black"
      color="white"
      p={2}
    >
      <Typography variant="h4" gutterBottom>
        <p>Chris Mingles</p>
        <h3>Get your entry code.</h3>
      </Typography >
      <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
        <input type="hidden" name="cmd" value="_s-xclick" />
        <input type="hidden" name="hosted_button_id" value="XA587Y8NTFXWQ" />
        <input type="hidden" name="currency_code" value="USD" />
        <input type="hidden" name="return" value="https://www.website.com" />
        <input type="hidden" name="cancel_return" value="https://www.website.com" />
        <input type="hidden" name="advanced_vars" value="address_override=1\nnotify_url=https://www.mywebsite.com/PayPal_IPN" />
        <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Buy Now" />
      </form>
    </Box>
  );
};

export default ProfileViewerEntry;
