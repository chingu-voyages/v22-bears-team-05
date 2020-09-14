import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { FunctionComponent, useRef } from 'react';
import { FaAward, FaPoll, FaTasks } from 'react-icons/fa';
import styled from 'styled-components';
import App from '../components/App';
import DropDownList from '../components/Landing/DropDownList';
import { withApollo } from '../utils/withApollo';

const TopSection = styled.div`
  width: 100%;
  position: relative;
  padding: 1rem 0;

  h1,
  h3 {
    color: white;
    padding: 0 1rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  @media only screen and (min-width: 800px) {
    h1 {
      font-size: 2.5rem;
    }

    h3 {
      font-size: 1.3rem;
    }
  }
`;

const TopTextContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;

  .imgContainer {
    display: none;
  }

  @media only screen and (min-width: 800px) {
    padding: 0 2rem;
    max-width: 1400px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 3rem;
    justify-items: stretch;
    justify-content: center;
    align-items: start;

    .imgContainer {
      display: block;

      img {
        max-width: 500px;
        max-height: 330px;
      }
    }

    h3 {
      text-align: left;
      max-width: 500px;
      margin: 0 auto;
      padding: 0;
    }

    > :first-child {
      justify-self: end;
    }

    > :last-child {
      justify-self: start;
    }
  }
`;

const BulletList = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding-bottom: 0;
  margin-top: 1rem;

  @media only screen and (min-width: 800px) {
    padding-bottom: 1rem;
  }
`;

const Bullet = styled.div`
  background: rgba(190, 190, 190, 0.24);

  display: inline-grid;
  grid-template-columns: 0.5fr 1fr;
  grid-gap: 37px;
  justify-content: center;
  justify-items: stretch;
  align-items: center;

  font-weight: bold;
  color: white;
  width: 100%;
  max-width: 500px;
  margin-bottom: 10px;
  padding: 0;
  text-align: left;
  font-size: 0.8rem;

  .icon {
    color: white;
    justify-self: end;
    width: 30px;
  }

  @media only screen and (min-width: 800px) {
    font-size: 1.2rem;
    padding: 1rem;

    .icon {
      width: 40px;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  font-weight: bold;
  padding: 1rem;

  > button {
    margin: 0.25rem;
    max-width: 500px;
    font-size: 1rem;
    letter-spacing: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }

  &.bottom {
    padding: 0;

    > button {
      max-width: 700px;
      padding: 2rem;
    }
  }

  @media only screen and (min-width: 800px) {
    > button {
      padding: 1.8rem;
      font-size: 1.3rem;
      margin: 0.5rem;
    }
    &.top {
      flex-flow: row nowrap;
      padding: 0.5rem;

      > button {
        margin: 0 0.5rem;
      }
    }
  }
`;

const Tint = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(29, 30, 44, 0.65);
  z-index: -2;
`;

const ImgCover = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -3;

  img {
    width: 100%;
    height: 100%;
  }
`;

const BottomSection = styled.section`
  padding: 3rem 1rem;

  .header {
    border: 3px solid #1d1e2c;
    padding: 8px 0;
    max-width: 700px;
    margin: 0 auto 3rem;
    border-radius: 32px;

    h1 {
      margin: 0 auto;
      white-space: nowrap;
      font-size: 1.1rem;
    }
  }

  h3 {
    margin: 3rem auto;
  }

  .imgContainer {
    margin: 0 auto;
    width: 100%;
    width: 100%;
    max-width: 700px;

    img {
      max-width: 700px;
      margin: 0 auto;
      width: 100%;
    }
  }

  @media only screen and (min-width: 380px) {
    .header {
      h1 {
        font-size: 1.4rem;
      }
    }
  }

  @media only screen and (min-width: 750px) {
    .header {
      h1 {
        max-width: 500px;
        font-size: 1.4rem;
      }
    }
  }
`;

const DROP_DOWN_DATA = [
  {
    title: 'Add a Goal',
    body: <b>Identify personal or professional goals you wish to achieve</b>,
  },
  {
    title: 'Add Tasks to reach that Goal',
    body: (
      <>
        <b>What requirements must be met to reach your goal?</b>
        <br />
        <br />
        Add tasks to help put your goal into perspective
      </>
    ),
  },
  {
    title: 'Break Tasks into managable chunks called Action Items',
    body: (
      <>
        <b>Make your tasks actionable!</b>
        <br />
        <br />
        Breaking tasks into action items will make each task more managable and
        in turn you are more likely to reach your goals!
        <br />
        <br />
        We recommend action items to be doable within a 2 hour time span.
      </>
    ),
  },
  {
    title: 'Track your effort by completing Action Items',
    body: (
      <b>
        Each action item comes with a timer to help you track time spent
        accomplishing your goals
      </b>
    ),
  },
  {
    title: 'Reward Yourself!',
    body: (
      <b>
        With customizable rewards, you choose the rewards that fit your
        lifestyle.
      </b>
    ),
  },
  {
    title: 'Check Your Trends',
    body: (
      <b>
        As you accomplish tasks, see your progress over time
        <br />
        <br />
        Personalize your stats by adding tags to tasks and goals
      </b>
    ),
  },
];

const IndexPage: FunctionComponent = () => {
  const router = useRouter();
  const learnMoreRef = useRef(null);

  const scroll = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <App>
      <Head>
        <title>GoalTrack Official</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <TopSection>
        <h1>Make Life Actionable</h1>
        <TopTextContainer>
          <div>
            <h3>A simple app to turn your goals into manageable steps</h3>
            <BulletList>
              <Bullet>
                <FaTasks size={50} className="icon" />
                <div>Task Driven</div>
              </Bullet>
              <Bullet>
                <FaPoll size={50} className="icon" />
                <div>Track Your Progress</div>
              </Bullet>
              <Bullet>
                <FaAward size={50} className="icon" />
                <div>Custom Rewards</div>
              </Bullet>
            </BulletList>
          </div>
          <div className="imgContainer">
            <img src="/undraw_main.svg" alt="undraw.co phone person graphic" />
          </div>
        </TopTextContainer>

        <ButtonContainer className="top">
          <button
            className="primary"
            type="button"
            onClick={() => router.push('/register')}
          >
            Get Started
          </button>
          <button
            className="secondary"
            type="button"
            onClick={() => scroll(learnMoreRef)}
          >
            Learn More
          </button>
        </ButtonContainer>
        <Tint />
        <ImgCover>
          <img src="/landing_bg.jpg" alt="landing background" />
        </ImgCover>
      </TopSection>
      <BottomSection>
        {/* Scroll Position upon Clicking "Learn More" */}
        <div ref={learnMoreRef} />
        <br />
        <div className="header">
          <h1>One Step Closer to Success</h1>
        </div>
        <div className="imgContainer">
          <img src="/undraw_goals.svg" alt="undraw.co goals graphic" />
        </div>
        <h3>
          With&nbsp;
          <i>GoalTrack</i>, reaching your goals is a simple process.
        </h3>
        <DropDownList data={DROP_DOWN_DATA} />
        <ButtonContainer className="bottom">
          <button
            className="primary"
            type="button"
            onClick={() => router.push('/register')}
          >
            Sign Me Up!
          </button>
        </ButtonContainer>
      </BottomSection>
    </App>
  );
};

export default withApollo({ ssr: false })(IndexPage);
