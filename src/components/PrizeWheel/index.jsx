import React, { useState, useEffect } from 'react';
import prizes from './prizes';
import './index.scss'

const PrizeWheel = () => {

	const [selectedPrize, setSelectedPrize] = useState(null);
	const [shouldSpinWheel, setShouldSpinWheel] = useState(false);
	const [reset, setReset] = useState(false);
	const [spinToDeg, setSpinToDeg] = useState('0deg');

	// Circle is 360 degrees, so need to work out the size of each prize section
	const wheelSectionSize = Math.floor(360 / prizes.length);
	const numberOfSegments = prizes.length;
	const wheelHeight = 25;
	const spinTime = 7; // seconds

	const spinWheel = () => {
		if (!reset) {
			setShouldSpinWheel(false)
			const spinNumber = Math.random();
			const spinDeg = Math.floor(spinNumber * 1000) + 2000;
			setSpinToDeg(`${spinDeg}deg`);
			setReset(true);
		}
	};

	useEffect(() => {
		if (reset) {
			setShouldSpinWheel(true);
			const timeout = spinTime * 1000;
			setTimeout(() => {
				setReset(false)
			}, timeout)
		}
	}, [reset])

	return (
		<div id="container" className={`prize-wheel spinner ${shouldSpinWheel ? 'spin' : ''}`} style={{
			'position': 'absolute',
			'top': `calc(50% - ${wheelHeight / 2}vw)`,
			'left': `calc(50% - ${wheelHeight / 2}vw)`,
			'height': `${wheelHeight}vw`,
			'width': `${wheelHeight}vw`,
			'transform': 'rotate(0deg)'
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
				{prizes.map((prize, index) => (
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
								}

								.prize-segment-${index}:before {
									width: inherit;
									height: inherit;
									position: absolute;
									left: 0;
									background-color: ${index % 2 ? '#007CBA' : '#FFCA3A'};
									content: "";
									border-radius: ${wheelHeight / 2}vw ${wheelHeight / 2}vw 0 0;
									transform-origin: 50% 100%;
									transform: rotate(${180 - wheelSectionSize}deg);
								}
							`}} />
						</div>
					</div>
				))}
			</div>
			<div className="wheel-spin-button-container" onClick={spinWheel}>
				<div className="wheel-spin-button" />
			</div>
		</div>
	);
};

export default PrizeWheel;


/*
{prizes.map(prize => (
	<li className="spinner-slice">
		<p className="spinner-slice-text">{prize}</p>
	</li>
))}



				{prizes.map((prize, index) => (
					<div style={{'transform': `rotate(${wheelSectionSize * index}deg)`, 'position': 'absolute'}}>
						<PrizeSegment size={wheelSectionSize} label={prize} />
					</div>
				))}
/*/