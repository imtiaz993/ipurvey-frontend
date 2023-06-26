import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import step4 from '../../../Assets/Group 3615.png';
import step3 from '../../../Assets/Group 3614.png';
import step2 from '../../../Assets/Group 3613.png';
import step1 from '../../../Assets/Group 3611.png';
import moment from 'moment';

export default function ReportTimeline({ data }) {
 return (
  <div className='AR_timeline_container'>
   <Timeline>
    {data.map((status) => (
     <TimelineItem>
      <TimelineSeparator>
       <TimelineDot style={{ backgroundColor: 'white' }}>
        <img src={step1} alt='...' />
       </TimelineDot>
       <TimelineConnector className='grnClr' />
      </TimelineSeparator>
      <TimelineContent>
       <div className='step1Head'>
        <h6 style={{ color: 'black' }}>{status.status}</h6>
        <p>{moment(status.createdAt).format('MMM D, YYYY | hh:mm')}</p>
       </div>
       <div className='timeline_user_info'>
        <p>{status.description}</p>
       </div>
      </TimelineContent>
     </TimelineItem>
    ))}
    {data.length < 2 && (
     <TimelineItem>
      <TimelineSeparator>
       <TimelineDot style={{ backgroundColor: 'white' }}>
        <img src={step2} alt='...' />
       </TimelineDot>
       <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
       <div className='step1Head'>
        <h6 style={{ opacity: '.5' }}>Qualifying disruption</h6>
       </div>
      </TimelineContent>
     </TimelineItem>
    )}
    {data.length < 3 && (
     <TimelineItem>
      <TimelineSeparator>
       <TimelineDot style={{ backgroundColor: 'white' }}>
        <img src={step3} alt='...' />
       </TimelineDot>
       <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
       <div className='step1Head'>
        <h6 style={{ opacity: '.5' }}>Claim Requested</h6>
       </div>
      </TimelineContent>
     </TimelineItem>
    )}
    {data.length < 4 && (
     <TimelineItem>
      <TimelineDot style={{ backgroundColor: 'white' }}>
       <img src={step4} alt='...' />
      </TimelineDot>
      <TimelineContent>
       <div className='step1Head'>
        <h6 style={{ opacity: '.5' }}>Closed</h6>
       </div>
      </TimelineContent>
     </TimelineItem>
    )}
   </Timeline>
  </div>
 );
}
