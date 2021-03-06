import React, { useState, useEffect } from 'react';
import Confetti from 'react-dom-confetti';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import prizes from './prizes';
import './index.scss'

const influencerData = {
	W2S: "W2S'",
	YungChip: "Chip's"
}

const PrizeWheel = ({title}) => {

	const [shouldSpinWheel, setShouldSpinWheel] = useState(false);
	const [reset, setReset] = useState(false);
	const [prizeWon, setPrizeWon] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [spinToDeg, setSpinToDeg] = useState('0deg');

	// Circle is 360 degrees, so need to work out the size of each prize section
	const wheelSectionSize = Math.floor(360 / 20);
	const wheelHeight = 40;
	const spinTime = 5; // seconds

	const toggleModal = () => setShowModal(!showModal);

	const spinWheel = () => {
		if (!reset) {
			setShouldSpinWheel(false)
			const spinNumber = Math.ceil(Math.random() * 20);
			determinePrize(spinNumber);
			// Offset to deal with centering and correct prize
			const offset = Math.floor( (360 / 20) / 2 ) + ( Math.floor( 360 / 20 ) );
			const spinDeg = Math.floor( (360 / 20) * spinNumber ) + 1080 + offset;
			setSpinToDeg(`${spinDeg}deg`);
			setReset(true);
		}
	};

	const determinePrize = spinNumber => {
		let prize = prizes[title].length - (spinNumber + 1);
		if (prize < 0) {
			prize = prizes[title].length + prize;
		}
		setPrizeWon(prize);
	}

	useEffect(() => {
		if (reset) {
			setShouldSpinWheel(true);
			const timeout = spinTime * 1000;
			setTimeout(() => {
				toggleModal();
				setReset(false)
			}, timeout)
		}
	}, [reset])

	const config = {
	  angle: 180,
	  spread: 360,
	  startVelocity: 40,
	  elementCount: 70,
	  dragFriction: 0.12,
	  elementCount: "200",
	  duration: 3000,
	  stagger: 3,
	  width: "10px",
	  height: "10px",
	  perspective: "500px",
	  colors: ["#4a5ea6", "#480948", "#884a41", "#f9f9fe", "#5164ae"]
	};

	return (
		<>
		{/* <div className="influencer-title" id={title}>
			{title}
		</div> */}
		<div className="prize-wheel-title">
			{influencerData[title]} Breakfast Bounty Wheel
		</div>
		<div className="prize-pointer"></div>
		<div className="confetti"> 
			<Confetti active={!reset} config={ config } />
		</div> 
		<div id="container" className={`prize-wheel spinner ${shouldSpinWheel ? 'spin' : ''}`} style={{
			'position': 'absolute',
			'top': `calc(50% - ${wheelHeight / 2}vw)`,
			'left': `calc(50% - ${wheelHeight / 2}vw)`,
			'height': `${wheelHeight}vw`,
			'width': `${wheelHeight}vw`,
			'transform': 'rotate(0deg)',
			'overflow': 'hidden',
			'boxShadow': '0 0 0 8px #FAFAFA',
			'borderRadius': '50%',
			'filter': 'drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.1))'
		}}>
			<style dangerouslySetInnerHTML={{__html: `
				.spin {
					animation: spinAnim ${spinTime}s;
					animation-fill-mode: both;
					animation-timing-function: cubic-bezier(.23,-0.25,.01,.99);
				}

				@keyframes spinAnim {
					0% {
						transform: rotate(0deg);
					}
					100% {
						transform: rotate(${spinToDeg})
					}
				}
			`}} />
			<div id="wheel" className="spinner-list">
				{prizes[title].map((prize, index) => (
					<>


					<div style={{
						'position': 'absolute',
						'transformOrigin': '50% 100%',
						'transform': `rotate(${wheelSectionSize * index}deg)`
					}}>
						<div className={`prize-segment-${index}`}>
							<style dangerouslySetInnerHTML={{__html: `
								.prize-segment-${index} {
									width: ${wheelHeight}vw;
									height: ${wheelHeight / 2}vw;
									overflow: hidden;
									position: relative;
									z-index: 2;
								}

								.prize-segment-${index}:before {
									width: inherit;
									height: inherit;
									position: absolute;
									left: 0;
									z-index: 2;
									background-color: ${index % 2 ? '#FFC700' : '#FF961B'};
									content: "";
									border-radius: ${wheelHeight / 2}vw ${wheelHeight / 2}vw 0 0;
									transform-origin: 50% 100%;
									transform: rotate(${180 - wheelSectionSize}deg);
								}
							`}} />
								<p className="prize-label">{prize}</p>
						</div>
					</div>
					</>
				))}
			</div>
		</div>
		<div className="wheel-spin-button-container" onClick={spinWheel}>
			<div className="wheel-spin-button" />
			<div className="center-logo" />
		</div>
		<Modal centered={true} isOpen={showModal} toggle={toggleModal} className="prize-modal">
			<ModalHeader>
				<div className="modal-logo"/>
			</ModalHeader>
			<ModalBody>
				<div className="prize-modal-title">
					WE HAVE A WINNER
				</div>
				<div className="prize-modal-prize">
					{prizes[title][prizeWon] && prizes[title][prizeWon].toUpperCase()}
				</div>
				<div className="cinnamon-icons">
					<div className="cinnamon-left"/>
					<div className="cinnamon-right"/>
				</div>
			</ModalBody>
		</Modal>
		</>
	);
};

export default PrizeWheel;
