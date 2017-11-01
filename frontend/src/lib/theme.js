import { createMuiTheme } from 'material-ui/styles'
import grey from 'material-ui/colors/grey'

const theme = createMuiTheme({
  palette: {
    primary: {
      ...grey,
      500: '#000',
    },
  },
  mixins: {
    appbar: {
      backgroundColor: 'rgba(255, 255, 255, 0)',
    },
    toolbar: {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      minHeight: '3.3em',
    },
  },
  typography: {
    fontFamily: '돋움, Dotum, Apple Gothic, Latin font, sans-serif',
    title: {
      fontSize: 44,
    },
    subheading: {
      fontSize: 32,
    },
    headline: {
      fontSize: 24,
    },
    display1: {
      fontSize: 19,
    },
    display2: {
      fontSize: 17,
    },
    display3: {
      fontSize: 14,
    },
    display4: {
      fontSize: 10,
    },
  },
  spacing: {
    unit: 8,
  },
  zIndex: {
    mobileStepper: 900,
    menu: 1000,
    appBar: 1100,
    drawerOverlay: 1200,
    navDrawer: 1300,
    dialogOverlay: 1400,
    dialog: 1500,
    layer: 2000,
    popover: 2100,
    snackbar: 2900,
    tooltip: 3000
  },
})

export default theme
