import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import './HeaderNew.css';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    imgPath:
      './pic/Header5.jpg',
  },
  {
    imgPath:
      './pic/Heade1.jpg',
  },
  {
    imgPath:
      './pic/Header7.jpg',
  },
  {
    imgPath:
      './pic/Header8.jpg',
  },
];

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

  return (
   
    <Box className="slider"
   sx={{ maxWidth: 1300, flexGrow: 7 }}
    >

      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 600,
                  display: 'block',
                  maxWidth: 1300,
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
 
/>
<Box sx={{ flexGrow: 1 }} className="about">
<Grid container spacing={3}>
  <Grid item xs={8}>
    <Item>
    <Typography gutterBottom variant="subtitle1" component="div" sx={{direction:'rtl', height: 220}}>
     
  <h1> נעים להכיר: CARENT</h1> 
  <h3>החברה המובילה בישראל להשכרת רכב</h3>
<p>
ומה הופך אותנו לחברה מובילה בתחום? 
במילה אחת: סטנדרטים.
הסטנדרטים שלנו גבוהים יותר, 
ואנחנו יודעים שגם שלכם.
אחרי יותר מ-32 שנים של מתן שירות 
לישראלים השוכרים רכב 
למדנו להתאים עבורכם 
את המוצר האידיאלי מצד אחד,
 ולהעניק לכם שירות ברמה הכי גבוהה 
 לאורך כל הדרך מצד שני.
 </p>
 </Typography>
      </Item>
  </Grid>
  <Grid item xs={4}>
  <Item sx={{height: 245}}>
             <Img alt="complex" src="./pic/Header2.jpg" />
           </Item>
  </Grid>
  

  <Grid item xs={4}>
    <Item sx={{height: 245}}>
    <Img alt="complex" src="./pic/Header1.jpg" />
    </Item>
  </Grid>
  <Grid item xs={8}>
    <Item>
    <Typography gutterBottom variant="subtitle1" component="div" sx={{direction:'rtl', height: 220}}>
   <h3> CARENT מאז הקמתנו  </h3>
   <p>
אנו מציבים רף חדש בתעשיית השכרת הרכב,  
כך שכל נסיעה, טיול או הרפתקה שלכם, 
מאפשרים לנו ללמוד ולהתפתח כדי שנוכל להמשיך ולהגיע רחוק יותר.
דרכנו תוכלו להזמין השכרת רכב לטיול המשפחתי או הקבוצתי  שלכם, 
ע”מ להזמין לכל הקבוצה שלכם 
תוכלו לשכור כמה רכבים בהזמנה אחת. 
   </p>
   </Typography> 
   </Item>
  </Grid>

  <Grid item xs={8}>
    <Item>
    <Typography gutterBottom variant="subtitle1" component="div" sx={{direction:'rtl', height: 220}}>
    <h1>---</h1>
<p>
באתר תמצאו מגוון רחב של הצעות אטרקטיביות 
וקבוצות רכב מתאימות עבורכם, ותיהנו ממענה יעיל
 בזמן ההשכרה וגם אחריה.
 במילים פשוטות: לכם נשאר רק לבחור את היעד ואנחנו נהיה שם בשבילכם. 
מוכנים לצאת איתנו לדרך?
<h3>CARENT הדרך שלכם מתחילה כאן ! </h3>

 </p>
 </Typography>
      </Item>
  </Grid>
  <Grid item xs={4}>
  <Item sx={{height: 245}}>
             <Img alt="complex" src="./pic/Header3.jpg" />
           </Item>
  </Grid>


</Grid>
</Box>
         
    </Box>
  );
}

export default SwipeableTextMobileStepper;








