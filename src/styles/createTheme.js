import { createMuiTheme } from '@material-ui/core/styles';
import { teal, grey } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    divider: grey[100]
  }
});

export default theme;
