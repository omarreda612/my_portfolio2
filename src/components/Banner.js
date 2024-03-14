import React from 'react'
import { useState,useEffect } from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import { ArrowRightCircle } from 'react-bootstrap-icons'
import './Banner.css'
import headerimg from "../assets/img/header-img.svg"
import 'animate.css'
import TrackVisibility from 'react-on-screen'
import { isVisible } from '@testing-library/user-event/dist/utils'

export const Banner = () => {
    const [loopNum,setLoopNum] = useState(0);
    const[isDeleting,setIsDeleting] = useState(false);
    const toRotate  =['web developer','web designer','freelancer'];
    const[text,setText] = useState('');
    const [index, setIndex] = useState(1);
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const period = 2000;

    useEffect(() => {
        let ticker = setInterval(() => {
          tick();
        }, delta);
    
        return () => { clearInterval(ticker) };
      }, [text])

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);
    
        setText(updatedText);
    
        if (isDeleting) {
          setDelta(prevDelta => prevDelta / 2);
        }
    
        if (!isDeleting && updatedText === fullText) {
          setIsDeleting(true);
          setIndex(prevIndex => prevIndex - 1);
          setDelta(period);
        } else if (isDeleting && updatedText === '') {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
          setIndex(1);
          setDelta(500);
        } else {
          setIndex(prevIndex => prevIndex + 1);
        }
      }

  return (
    <section className='banner' id='home'>
        <Container>
            <Row className='align-items-center'>
                <Col xs={12} md={6} xl={7}>
                  <TrackVisibility>
                  {({ isVisible }) =>
                    <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                      <span className="tagline">Welcome to my Portfolio</span>
                      <h1>{`Hi! I'm Omar`} <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Web Developer", "Web Designer", "UI/UX Designer" ]'><span className="wrap">{text}</span></span></h1>
                      <p>showcasing expertise in front-end development, particularly in React and Angular. With a deep understanding of modern web technologies and a passion for crafting seamless user experiences, I bring creativity and precision to every project I undertake.</p>
                      <button onClick={() => console.log('connect')}>Contact Me <ArrowRightCircle size={25} /></button>
                    </div>}
                  </TrackVisibility>
                </Col>
                <Col xs={12} md={6} xl={5}>
                    <img src={headerimg} alt='header img' />
                </Col>
            </Row>
        </Container>
    </section>
  )
}
