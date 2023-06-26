import { makeStyles, withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const useStyles = makeStyles((theme) => ({
 root: {
  width: '60%',
  margin: '0px auto',
  marginBottom: '50px',
 },
 heading: {
  fontSize: theme.typography.pxToRem(15),
  fontWeight: theme.typography.fontWeightRegular,
 },
 text: {
  color: '#2E58A6',
  fontSize: '.9rem',
 },
}));

const Accordion = withStyles({
 root: {
  border: '0px solid rgba(0, 0, 0, .125)',
  boxShadow: 'none',
  '&:not(:last-child)': {
   borderBottom: 0,
  },
  '&:before': {
   display: 'none',
  },
  '&$expanded': {
   margin: 'auto',
  },
  margin: '15px 0px',
 },
 expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
 root: {
  backgroundColor: 'white',
  borderRadius: '10px',
  borderBottom: '0px solid rgba(0, 0, 0, .125)',
  marginBottom: -1,
  minHeight: 56,
  boxShadow: '0px 3px 6px rgba(0, 0, 0, .125) ',
  '&$expanded': {
   minHeight: 56,
  },
 },
 content: {
  '&$expanded': {
   margin: '12px 0',
  },
 },
 expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
 root: {
  padding: theme.spacing(2),
 },
}))(MuiAccordionDetails);

export default function SimpleAccordion({ data }) {
 const classes = useStyles();
 return (
  <div className={classes.root}>
   {data?.map((term) => {
    return (
     <Accordion square key={term.id}>
      <AccordionSummary
       expandIcon={<ExpandMoreIcon />}
       aria-controls='panel1a-content'
       id='panel1a-header'
      >
       <Typography className={classes.heading}>{term?.question}</Typography>
      </AccordionSummary>
      <AccordionDetails>
       <Typography className={classes.text}>{term?.answer}</Typography>
      </AccordionDetails>
     </Accordion>
    );
   })}
  </div>
 );
}
