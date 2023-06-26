import { useState, useEffect } from 'react';
import DepartureDateForm from './DepartureDateForm';
import { useHistory } from 'react-router-dom';
import WhereWereTraveling from './WhereWereTraveling';
import MoreDetail from './MoreDetail';
import Loading from './Loading';
import SelectFlight from './SelectFlight';
import EmailForm from './EmailForm';
import OneStepAway from './OneStepAway';

import tick from '../../Assets/Path 6521.png';

const nextStepForm = (data, nextFunc, backFunc, steps) => {
  switch (steps) {
    case 0:
      return (
        <DepartureDateForm data={data} nextBtn={nextFunc} backBtn={backFunc} />
      );
    case 1:
      return (
        <WhereWereTraveling data={data} nextBtn={nextFunc} backBtn={backFunc} />
      );
    case 2:
      return <MoreDetail data={data} nextBtn={nextFunc} backBtn={backFunc} />;
    case 4:
      return <SelectFlight data={data} nextBtn={nextFunc} backBtn={backFunc} />;
    case 5:
    //  return <TryAgain nextBtn={nextFunc} backBtn={backFunc} />;
    // case 7:
    //  return <Longer nextBtn={nextFunc} backBtn={backFunc} />;
    // case 8:
    //  return <Question nextBtn={nextFunc} backBtn={backFunc} />;
    case 6:
      return <EmailForm data={data} nextBtn={nextFunc} backBtn={backFunc} />;
    case 7:
      return <OneStepAway data={data} nextBtn={nextFunc} />;

    default:
      break;
  }
};

const Stepper = ({ data }) => {
  const history = useHistory();

  let [nextStep, setNextStep] = useState(0);
  let [loading, setLoading] = useState(false);
  const handleNextButton = () => {
    setNextStep(++nextStep);
    if (nextStep === 3) {
      setLoading(true);
    }
  };
  useEffect(() => {
    if (nextStep === 3) {
      setTimeout(() => {
        setLoading(false);
        if (nextStep >= 3 && nextStep <= 3) {
          setNextStep(++nextStep);
        }
      }, 2000);
    }
  }, [loading]);
  const handleBackButton = () => {
    if (nextStep > 0) {
      if (nextStep === 4) {
        setNextStep(nextStep - 2);
      } else {
        setNextStep(--nextStep);
      }
    }
    if (nextStep <= 0) {
      history.push('/');
    }
  };

  return (
    <div className='claim_stepper_container'>
      <div className='claimStepper_md'>
        <div className='claim_stepper_main'>
          <div className='claimSteps_head'>
            <div className='firstStep_md'>
              <div className='step_name'>
                <p
                  className='step_dot clr_dot'
                  style={nextStep >= 6 ? { background: '#50c900' } : { background: '' }}
                >
                  {nextStep >= 6 ? <img src={tick} alt='...' /> : null}{' '}
                </p>
                <div className='steps_line'>
                  <p className='dflt_step_line'></p>
                  <p
                    className={`filed_line ${nextStep === 0
                        ? ' w_i_30'
                        : nextStep === 1
                          ? 'w_i_30'
                          : nextStep === 2
                            ? 'w_i_70'
                            : nextStep === 3
                              ? 'w_i_100'
                              : nextStep === 4 || nextStep === 5
                                ? 'w_i_130 blueBg'
                                : 'w_i_130 greenBg'
                      }`}
                  ></p>
                </div>
              </div>
              <p className='step_val' style={{ opacity: 1 }}>
                Eligibility
              </p>
            </div>
            <div className='SecondStep_md'>
              <div className='step_name'>
                <p className={nextStep >= 6 ? 'step_dot clr_dot' : 'step_dot '}></p>
                <div className='steps_line'>
                  <p className='dflt_step_line'></p>
                  <p
                    className={`filed_line ${nextStep === 6
                        ? 'w_i_30'
                        : nextStep === 7
                          ? 'w_i_70'
                          : nextStep === 8
                            ? 'w_i_100'
                            : 'w_i_130 '
                      } `}
                  ></p>
                </div>
              </div>
              <p className='step_val step_prsnl_dtl'>Passenger Details</p>
            </div>
            <div className='firstStep_md'>
              <div className='step_name'>
                <p className='step_dot'></p>
              </div>
              <p className='step_val'>Finish</p>
            </div>
          </div>
          <div className='stepper_body'>
            {!loading ? (
              nextStepForm(data, handleNextButton, handleBackButton, nextStep)
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
