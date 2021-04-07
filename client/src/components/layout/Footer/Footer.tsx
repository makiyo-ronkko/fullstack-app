import React, { FC } from 'react';
import './Footer.css';

const Footer: FC = (): JSX.Element => {
	return (
		<div className='Footer'>
			<div className='copyright'>
				<p>Copyright &copy; 2020 Makiyo Rönkkö</p>
			</div>
		</div>
	);
};

export default Footer;
